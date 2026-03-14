# Site Pessoal — Leonardo Escuciato

> Documentacao completa do site pessoal: aplicacao, infraestrutura e fluxo de trabalho. Pronto para consulta e manutencao.

---

## Visao Geral

Site pessoal desenvolvido com Astro em modo SSR (Server-Side Rendering), rodando em um VPS Hostinger. O site combina apresentacao profissional, blog com editor rico e uma area de games com tema cyberpunk — tudo gerenciado por uma unica area administrativa protegida por autenticacao JWT.

| Campo | Valor |
|---|---|
| URL publica | https://srv1103792.hstgr.cloud |
| Repositorio GitHub | https://github.com/lescuciato/EscuciatoWebSitePersonal |
| Ambiente de desenvolvimento | Windows + Claude Code (WSL2) |

---

## Stack da Aplicacao

### Frontend e Framework

| Tecnologia | Versao | Funcao |
|---|---|---|
| Astro | ^5.0.0 | Framework principal — modo SSR com adapter Node |
| React | ^18.3.0 | Ilhas interativas (componentes `.tsx`) |
| Tailwind CSS | ^3.4.0 | Estilizacao utilitaria |
| TipTap | ^2.10.0 | Editor de texto rico para o blog |
| TypeScript | ^5.7.0 | Tipagem estatica em toda a base de codigo |

### Backend e Dados

| Tecnologia | Versao | Funcao |
|---|---|---|
| @astrojs/node | ^9.0.0 | Adapter SSR — gera servidor Node.js standalone |
| better-sqlite3 | ^11.0.0 | Banco de dados SQLite embutido |
| jose | ^5.9.0 | Geracao e verificacao de tokens JWT |

### Configuracao Astro (`astro.config.mjs`)

```javascript
export default defineConfig({
  output: 'server',          // SSR completo (sem pre-render)
  adapter: node({
    mode: 'standalone'       // Gera entry.mjs autossuficiente
  }),
  integrations: [react(), tailwind()],
});
```

> Nota: `mode: 'standalone'` gera o arquivo `dist/server/entry.mjs` que pode ser executado diretamente com `node`, sem precisar de um servidor Express separado.

---

## Estrutura de Arquivos

```
/
├── astro.config.mjs          — Configuracao do Astro
├── tailwind.config.mjs       — Configuracao do Tailwind
├── tsconfig.json             — Configuracao TypeScript
├── package.json              — Dependencias e scripts
├── data/
│   └── blog.db               — Banco SQLite (criado automaticamente)
├── public/                   — Assets estaticos (imagens, favicon)
└── src/
    ├── middleware.ts         — Protecao de rotas admin
    ├── components/
    │   ├── blog/
    │   │   ├── PostCard.astro    — Card de post no feed
    │   │   └── TipTapEditor.tsx  — Editor rico (componente React)
    │   ├── games/
    │   │   └── GameCard.astro    — Card de game
    │   ├── home/
    │   │   ├── Hero.astro        — Secao de apresentacao
    │   │   ├── Experience.astro  — Historico profissional
    │   │   ├── Skills.astro      — Habilidades tecnicas
    │   │   └── Achievements.astro — Conquistas
    │   └── layout/               — Layouts base
    ├── lib/
    │   ├── db.ts             — Modulo SQLite (queries de posts e games)
    │   └── auth.ts           — Modulo JWT (sessao, cookies)
    └── pages/
        ├── index.astro       — Home (curriculo interativo)
        ├── login.astro       — Pagina de login
        ├── blog/
        │   ├── index.astro   — Feed de posts publicados
        │   ├── [slug].astro  — Post individual
        │   ├── new.astro     — Criar post (protegido)
        │   └── admin.astro   — Gerenciar posts (protegido)
        ├── games/
        │   ├── index.astro   — Lista de games
        │   └── admin.astro   — Gerenciar games (protegido)
        └── api/
            ├── auth/
            │   ├── login.ts      — POST /api/auth/login
            │   └── logout.ts     — POST /api/auth/logout
            ├── posts/
            │   ├── index.ts      — GET/POST /api/posts
            │   └── [id].ts       — PUT/DELETE /api/posts/:id
            └── games/
                ├── index.ts      — GET/POST /api/games
                └── [id].ts       — PUT/DELETE /api/games/:id
```

---

## Paginas e Rotas

| Secao | Rota | Autenticacao | Descricao |
|---|---|---|---|
| Home | `/` | Nao | Apresentacao profissional baseada no curriculo |
| Blog | `/blog` | Nao | Feed de posts publicados (SQLite) |
| Post | `/blog/[slug]` | Nao | Visualizacao de post individual |
| Novo Post | `/blog/new` | Sim | Editor TipTap para criar post |
| Admin Blog | `/blog/admin` | Sim | Listar, editar, publicar e excluir posts |
| Games | `/games` | Nao | Lista de games — tema cyberpunk |
| Admin Games | `/games/admin` | Sim | Gerenciar games (adicionar, editar, excluir) |
| Login | `/login` | Nao | Autenticacao admin |

---

## Banco de Dados (SQLite)

Arquivo: `/root/WebSite/source/data/blog.db`

O banco e criado automaticamente na primeira execucao do servidor. Usa WAL mode para melhor desempenho em leituras concorrentes.

### Tabela `posts`

| Coluna | Tipo | Descricao |
|---|---|---|
| `id` | INTEGER | Chave primaria autoincrement |
| `slug` | TEXT UNIQUE | URL amigavel do post |
| `title` | TEXT | Titulo |
| `excerpt` | TEXT | Resumo curto |
| `content` | TEXT | Conteudo HTML (gerado pelo TipTap) |
| `tags` | TEXT | Tags separadas por virgula |
| `published` | INTEGER | `0` = rascunho, `1` = publicado |
| `created_at` | TEXT | Data de criacao |
| `updated_at` | TEXT | Data da ultima atualizacao |

### Tabela `games`

| Coluna | Tipo | Descricao |
|---|---|---|
| `id` | INTEGER | Chave primaria autoincrement |
| `title` | TEXT | Nome do game |
| `platform` | TEXT | Plataforma (PC, PS5, etc.) |
| `status` | TEXT | `playing`, `finished`, `queued`, `paused` |
| `rating` | INTEGER | Nota de 0 a 10 |
| `review` | TEXT | Texto da review |
| `cover_url` | TEXT | URL da capa |
| `created_at` | TEXT | Data de adicao |

---

## Autenticacao

O sistema usa JWT com sessao em cookie `httpOnly`, implementado com a biblioteca `jose`.

### Fluxo de Login

```
1. Usuario acessa /login e envia senha
2. POST /api/auth/login — verifica ADMIN_PASSWORD do .env
3. Se correta: gera JWT assinado com JWT_SECRET (expira em 7 dias)
4. JWT e armazenado em cookie httpOnly, SameSite=Lax
5. Redirecionamento para a pagina solicitada (query ?next=)
```

### Protecao de Rotas (Middleware)

O `src/middleware.ts` intercepta todas as requisicoes e protege os seguintes padroes:

```
/blog/new
/blog/admin
/blog/:slug/edit
/games/admin
```

Se o usuario nao tiver sessao valida, e redirecionado para `/login?next=<rota>`.

### Variaveis de Ambiente (`.env` no servidor)

```bash
ADMIN_PASSWORD=<senha-definida-no-servidor>
JWT_SECRET=<chave-aleatoria-longa>
HOST=0.0.0.0
PORT=4321
```

> Aviso: O arquivo `.env` existe apenas no servidor (`/root/WebSite/source/.env`). Ele NAO esta no repositorio Git. Nunca adicione segredos ao repositorio.

---

## Infraestrutura do Servidor

### Especificacoes do VPS

| Campo | Valor |
|---|---|
| Provedor | Hostinger |
| Host | `srv1103792.hstgr.cloud` |
| IP | `72.61.39.74` |
| OS | Ubuntu 24.04.4 LTS |
| RAM | 7.8 GiB |
| Disco | 96 GB (40 GB usados) |
| Node.js | v24.14.0 (via nvm) |
| Docker | 29.3.0 |
| PM2 | v6.0.14 |

### Versoes de Software

| Software | Versao | Funcao |
|---|---|---|
| Traefik | v3.6.10 | Reverse proxy + TLS automatico (Let's Encrypt) |
| Nginx (alpine) | Container Docker | Proxy reverso para o Node.js na porta 4321 |
| PM2 | v6.0.14 | Gerenciador de processos Node.js |
| Node.js | v24.14.0 | Execucao do servidor Astro SSR |
| nvm | v0.39.7 | Gerenciador de versoes do Node.js |

### Containers Docker em Execucao

| Nome do Container | Imagem | Funcao |
|---|---|---|
| `n8n-traefik-1` | `traefik` | Reverse proxy + TLS automatico |
| `n8n-n8n-1` | `n8n` | Automacao de workflows — NAO MODIFICAR |
| `website-website-1` | `nginx:alpine` | Proxy reverso para o Node.js porta 4321 |

Todos os containers compartilham a rede Docker `n8n_default` (bridge).

---

## Fluxo de Trafego

```
Visitante (Internet)
        ↓  HTTPS porta 443
Traefik (container n8n-traefik-1)
    — TLS terminado aqui (certificado Let's Encrypt)
    — Roteia pelo hostname srv1103792.hstgr.cloud
        ↓  HTTP interno
Nginx (container website-website-1)
    — proxy_pass para http://host-gateway:4321
        ↓  HTTP porta 4321
Node.js / Astro SSR (processo PM2 "website")
    — Serve as paginas SSR e a API REST
```

> Nota: `host-gateway` e o IP da maquina host visto de dentro do container Docker. O Nginx usa essa referencia para alcançar o processo PM2 que roda fora dos containers.

---

## Caminhos Importantes no Servidor

| Caminho | Funcao |
|---|---|
| `/root/repos/website.git` | Repositorio bare (recebe `git push`) |
| `/root/repos/website.git/hooks/post-receive` | Hook de deploy automatico |
| `/root/WebSite/source` | Codigo-fonte apos checkout |
| `/root/WebSite/source/.env` | Variaveis de ambiente (segredos) |
| `/root/WebSite/source/data/blog.db` | Banco de dados SQLite |
| `/root/WebSite/nginx/default.conf` | Configuracao ativa do Nginx (proxy_pass) |
| `/root/WebSite/docker-compose.yml` | Definicao do container Nginx |
| `/root/n8n/compose.yaml` | Stack n8n + Traefik — NUNCA MODIFICAR |

> Aviso: `nginx.conf` na raiz de `/root/WebSite/` e um arquivo legado e NAO esta em uso. A configuracao ativa e `/root/WebSite/nginx/default.conf`.

---

## Fluxo de Deploy

### Configuracao unica (feita uma so vez, no ambiente local)

```bash
git remote add production root@72.61.39.74:/root/repos/website.git
```

### Comando de deploy

```bash
git push production main
```

### O que acontece no servidor apos o push

O hook `post-receive` executa automaticamente:

```bash
# 1. Carrega o nvm para ter acesso ao node/npm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Checkout do codigo-fonte
git --work-tree=/root/WebSite/source --git-dir=/root/repos/website.git checkout -f main

# 3. Instala dependencias (baseado no package-lock.json)
cd /root/WebSite/source
npm ci

# 4. Compila o projeto Astro (gera dist/)
npm run build

# 5. Reinicia o processo Node.js com PM2
pm2 restart website
```

### Scripts NPM disponiveis

| Comando | Funcao |
|---|---|
| `npm run dev` | Servidor de desenvolvimento local (com hot-reload) |
| `npm run build` | Compila o projeto para producao (gera `dist/`) |
| `npm run start` | Inicia o servidor SSR (`node dist/server/entry.mjs`) |
| `npm run preview` | Preview do build local |

---

## Gerenciamento do Processo (PM2)

O processo Node.js e gerenciado pelo PM2 com o nome `website`.

### Comandos PM2 no servidor

```bash
# Ver status do processo
pm2 status

# Ver logs em tempo real
pm2 logs website

# Reiniciar o processo
pm2 restart website

# Parar o processo
pm2 stop website

# Ver ultimas linhas de log
pm2 logs website --lines 50
```

> Nota: PM2 esta rodando com o usuario `root`. Isso e funcional, mas pode ser migrado para o usuario `claude` em uma refatoracao futura.

---

## Agente Claude Code — Acesso SSH

Para inspecao e manutencao via agente Claude Code:

| Campo | Valor |
|---|---|
| Usuario | `claude` |
| Comando | `ssh claude@72.61.39.74` |
| Permissoes sudo | `NOPASSWD:ALL` |
| Grupos | `sudo`, `docker` |

---

## Pontos de Atencao e Riscos

### 1. Permissao em `/root/WebSite/nginx/`

O diretorio `/root/WebSite/nginx/` esta com dono `root`. Qualquer alteracao na config do Nginx via usuario `claude` pode exigir `sudo`.

**Acao recomendada:** `sudo chown -R claude:claude /root/WebSite/nginx/`

### 2. PM2 rodando como root

O processo `website` esta sendo gerenciado pelo PM2 com o usuario `root`. Isso funciona, mas e uma pratica que aumenta a superficie de ataque.

**Acao recomendada (futura):** migrar o PM2 para o usuario `claude`.

### 3. Porta 4321 exposta em `0.0.0.0`

O Node.js esta ouvindo em `0.0.0.0:4321`, o que significa que qualquer IP pode acessar diretamente o servidor Astro, pulando o Nginx e o Traefik.

**Acao recomendada:** alterar `HOST=127.0.0.1` no `.env` e ajustar o `proxy_pass` do Nginx para `http://127.0.0.1:4321`.

### 4. Sem swap configurado

O servidor nao tem swap. Em picos de memoria durante o build (`npm run build`), o processo pode ser morto pelo OOM killer.

**Acao recomendada:** configurar ao menos 1-2 GB de swap.

### 5. n8n stack — NAO MODIFICAR

A stack do n8n em `/root/n8n/compose.yaml` inclui o Traefik. Qualquer alteracao nesse arquivo pode derrubar o Traefik e tirar o site do ar — junto com o n8n.

> Aviso: NUNCA edite `/root/n8n/compose.yaml`. Para configuracoes de rede e roteamento, use apenas `/root/WebSite/docker-compose.yml`.

### 6. monarx-agent (porta 65529)

Agente de seguranca instalado pela Hostinger. Nao remover — e parte do contrato de servico do VPS.

---

## Comandos de Verificacao Rapida

### No servidor (via SSH)

```bash
# Ver todos os containers rodando
docker ps

# Ver status do PM2
pm2 status

# Testar se o site responde
curl -sk https://srv1103792.hstgr.cloud/ | head -20

# Testar resposta direta do Node.js (sem Nginx/Traefik)
curl http://localhost:4321/

# Ver uso de memoria/disco
free -h
df -h /
```

### No ambiente local (Windows)

```bash
# Ver remotes configurados
git remote -v

# Deploy completo
git add .
git commit -m "descricao das mudancas"
git push production main

# Ver log do ultimo push
git log production/main --oneline -5
```

---

## Historico da Configuracao do Servidor

A configuracao inicial do servidor foi feita em 13/03/2026 e seguiu este roteiro:

1. Instalacao do Node.js via nvm (servidor nao tinha Node.js)
2. Criacao do repositorio bare em `/root/repos/website.git`
3. Escrita do hook `post-receive` com build e deploy automaticos
4. Configuracao do container Nginx com labels Traefik
5. Subida do container na rede `n8n_default` (compartilhada com Traefik)

> Nota: Como o Traefik ja controlava as portas 80 e 443 (via stack do n8n), o Nginx foi colocado como container Docker — nao como servico nativo do host.

Detalhes completos: consultar `configuracao-inicial.md` na raiz do repositorio.

---

## Links e Recursos

| Recurso | Link |
|---|---|
| Site em producao | https://srv1103792.hstgr.cloud |
| Repositorio GitHub | https://github.com/lescuciato/EscuciatoWebSitePersonal |
| Documentacao Astro | https://docs.astro.build |
| Documentacao TipTap | https://tiptap.dev/docs |
| Documentacao Traefik | https://doc.traefik.io/traefik |
| Documentacao PM2 | https://pm2.keymetrics.io/docs |
| Documentacao jose (JWT) | https://github.com/panva/jose |
