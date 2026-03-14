# Configuração Inicial do Servidor VPS

**Data:** 13/03/2026
**Servidor:** Hostinger VPS — `srv1103792.hstgr.cloud`
**IP:** `72.61.39.74`
**OS:** Ubuntu 24.04 LTS

---

## Visão Geral

Este documento descreve a configuração do servidor VPS para receber deploys de um site pessoal desenvolvido localmente no Windows com Claude Code. O fluxo de trabalho é:

```
Desenvolvimento local (Windows + Claude Code)
        ↓
    git push
        ↓
Hook no servidor (build automático)
        ↓
Site publicado em HTTPS
```

---

## Estado Inicial do Servidor

Ao iniciar a configuração, o servidor já possuía:

| Componente | Detalhe |
|---|---|
| Docker | Instalado e ativo |
| Traefik v3.6.10 | Container rodando, controlando as portas 80 e 443 |
| n8n | Container rodando, roteado pelo Traefik |
| Python 3 | 3.12.3 |
| Git | 2.43.0 |
| Node.js | **Não instalado** |
| Nginx/Apache nativo | **Não instalado** |

> **Importante:** Como o Traefik já controlava as portas 80 e 443, não foi possível instalar o Nginx diretamente no host. A solução foi subir o Nginx como um container Docker e integrá-lo ao Traefik.

---

## Passo 1 — Instalar Node.js via nvm

O Node.js é necessário para fazer o build do projeto Astro no servidor durante o deploy.

```bash
# Baixar e executar o instalador do nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Carregar o nvm na sessão atual
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Instalar a versão LTS do Node.js
nvm install --lts

# Verificar instalação
node --version  # v24.14.0
npm --version   # 11.9.0
```

**Por que nvm?**
O nvm (Node Version Manager) permite instalar e alternar entre versões do Node.js sem precisar de permissões root. O hook de deploy carrega o nvm automaticamente a cada execução.

---

## Passo 2 — Criar o Repositório Git Bare

Um repositório *bare* é um repositório Git sem arquivos de trabalho — serve apenas para receber pushes. É a forma padrão de configurar um servidor Git próprio.

```bash
# Criar a pasta e inicializar o repositório bare
mkdir -p /root/repos/website.git
cd /root/repos/website.git
git init --bare
```

**Estrutura criada:**
```
/root/repos/website.git/
├── HEAD
├── config
├── hooks/       ← aqui ficará o hook de deploy
├── info/
├── objects/
└── refs/
```

---

## Passo 3 — Criar o Hook de Deploy (post-receive)

O hook `post-receive` é um script executado automaticamente pelo Git **após** receber um push. Ele faz o build do projeto e publica os arquivos no diretório servido pelo Nginx.

```bash
# Criar o arquivo do hook
nano /root/repos/website.git/hooks/post-receive
```

**Conteúdo do arquivo `/root/repos/website.git/hooks/post-receive`:**

```bash
#!/bin/bash
set -e

# Carregar o nvm para ter acesso ao node e npm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

REPO="/root/repos/website.git"
WORK_DIR="/root/WebSite/source"
DEPLOY_DIR="/root/WebSite/html"

echo "--- Deploy iniciado ---"

# Fazer checkout do código-fonte no diretório de trabalho
mkdir -p "$WORK_DIR"
git --work-tree="$WORK_DIR" --git-dir="$REPO" checkout -f main

# Instalar dependências e fazer o build
cd "$WORK_DIR"
npm ci
npm run build

# Sincronizar os arquivos gerados para o diretório público
rsync -a --delete dist/ "$DEPLOY_DIR/"

echo "--- Deploy concluído ---"
```

```bash
# Tornar o hook executável (obrigatório, senão o Git ignora)
chmod +x /root/repos/website.git/hooks/post-receive
```

**O que cada parte faz:**

| Comando | Função |
|---|---|
| `set -e` | Interrompe o script se qualquer comando falhar |
| `git checkout -f main` | Extrai os arquivos do branch `main` para `/root/WebSite/source` |
| `npm ci` | Instala dependências exatamente como definido no `package-lock.json` |
| `npm run build` | Gera os arquivos estáticos na pasta `dist/` |
| `rsync --delete` | Copia os arquivos gerados para o diretório público, removendo arquivos antigos |

---

## Passo 4 — Criar as Pastas de Deploy

```bash
mkdir -p /root/WebSite/source   # código-fonte após checkout
mkdir -p /root/WebSite/html     # arquivos públicos servidos pelo Nginx
```

**Estrutura final em `/root/WebSite`:**
```
/root/WebSite/
├── docker-compose.yml   ← configuração do container Nginx
├── source/              ← código-fonte (preenchido pelo hook)
├── html/                ← arquivos públicos (servidos ao visitante)
└── docs/                ← documentação do projeto
```

---

## Passo 5 — Configurar o Container Nginx com Traefik

Como o Traefik já controla as portas 80 e 443, o Nginx precisa rodar como container Docker e ser "apresentado" ao Traefik via labels.

**Arquivo `/root/WebSite/docker-compose.yml`:**

```yaml
services:
  website:
    image: nginx:alpine
    restart: unless-stopped
    volumes:
      - ./html:/usr/share/nginx/html:ro   # monta a pasta html como somente-leitura
    labels:
      # Habilitar roteamento pelo Traefik
      - "traefik.enable=true"
      # Rota HTTPS
      - "traefik.http.routers.website.rule=Host(`srv1103792.hstgr.cloud`)"
      - "traefik.http.routers.website.entrypoints=websecure"
      - "traefik.http.routers.website.tls.certresolver=mytlschallenge"
    networks:
      - n8n_default   # mesma rede do Traefik

networks:
  n8n_default:
    external: true    # rede já existente, criada pelo stack do n8n
```

**Por que `n8n_default`?**
O Traefik foi iniciado pelo Compose do n8n em `/root/n8n/compose.yaml`, que criou automaticamente a rede `n8n_default`. Para que o Traefik enxergue o container do Nginx, ambos precisam estar na mesma rede Docker.

**Por que `mytlschallenge`?**
É o nome do resolver de certificados TLS configurado no Traefik do servidor. Ele usa Let's Encrypt para gerar e renovar certificados HTTPS automaticamente.

---

## Passo 6 — Subir o Container

```bash
cd /root/WebSite
docker compose up -d

# Verificar se está rodando
docker ps | grep website
```

---

## Verificação Final

```bash
# Testar HTTPS
curl -sk https://srv1103792.hstgr.cloud/
# Resposta esperada: conteúdo HTML da página

# Testar redirecionamento HTTP → HTTPS
curl -I http://srv1103792.hstgr.cloud/
# Resposta esperada: 308 Permanent Redirect
```

Resultado: site acessível em **https://srv1103792.hstgr.cloud** com HTTPS válido.

---

## Como Fazer Deploy (fluxo do desenvolvedor)

### Configuração única (no Windows, uma só vez)

```bash
# Dentro da pasta do projeto Astro
git remote add production root@72.61.39.74:/root/repos/website.git
```

### A cada deploy

```bash
git add -A
git commit -m "descrição das mudanças"
git push production main
```

O servidor irá automaticamente:
1. Receber o push
2. Fazer checkout do código
3. Instalar dependências (`npm ci`)
4. Gerar os arquivos estáticos (`npm run build`)
5. Publicar no site (`rsync`)

---

## Resumo de Caminhos Importantes

| Caminho | Função |
|---|---|
| `/root/repos/website.git` | Repositório Git bare (recebe os pushes) |
| `/root/repos/website.git/hooks/post-receive` | Hook de deploy automático |
| `/root/WebSite/source` | Código-fonte após checkout |
| `/root/WebSite/html` | Arquivos servidos ao visitante |
| `/root/WebSite/docker-compose.yml` | Configuração do container Nginx |
| `/root/n8n/compose.yaml` | Stack n8n + Traefik (não modificado) |

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| Ubuntu | 24.04 LTS | Sistema operacional do servidor |
| Docker | — | Orquestração de containers |
| Traefik | v3.6.10 | Reverse proxy + TLS automático |
| Nginx | alpine | Servidor web (container) |
| Node.js | v24.14.0 | Build do projeto Astro |
| nvm | v0.39.7 | Gerenciador de versões do Node.js |
| Git | 2.43.0 | Controle de versão e trigger de deploy |
| Astro | — | Framework do site (instalado no projeto local) |
| Let's Encrypt | — | Certificado HTTPS gratuito e automático |
