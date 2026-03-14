/**
 * Portuguese (Brazil) translations — primary language, mirrors current site content.
 */
export const pt = {
  // ─── Navigation ───────────────────────────────────────────────────────────
  nav: {
    home: 'Home',
    professional: 'Profissional',
    blog: 'Blog',
    games: 'Games',
    about: 'Sobre o Site',
  },

  // ─── Home / Hero ──────────────────────────────────────────────────────────
  hero: {
    summary:
      'Vivo em Campinas, jogo tênis quando o corpo deixa e faço churrasco quando não deixa. Bebo vinho nos dois casos. Aos domingos, torço pela Ponte Preta e chamo isso de hobby.',
    contact: 'Contato',
    viewProfile: 'Ver perfil profissional →',
  },

  // ─── Home / Hobbies ───────────────────────────────────────────────────────
  hobbies: {
    sectionTitle: 'Interesses',
    items: [
      { emoji: '🎾', label: 'Tênis', description: 'Nas quadras sempre que possível' },
      { emoji: '🎮', label: 'Video Games', description: 'Aventuras digitais de todo tipo' },
      { emoji: '🍖', label: 'Boa Mesa', description: 'Churrasco, vinho e boa companhia' },
      { emoji: '⚽', label: 'Futebol', description: 'Torcedor da Macaca' },
      { emoji: '👶', label: 'Pedrinho chegando', description: 'Em agosto chega o Pedro!' },
    ],
  },

  // ─── Professional page ────────────────────────────────────────────────────
  professional: {
    pageTitle: 'Perfil Profissional',
    metaDescription:
      'Leonardo Escuciato — Sr. Atlassian Consultant. Experiência em gestão ágil, consultoria Atlassian e liderança de equipes.',
    summaryText:
      'Profissional com sólida experiência em gestão de times ágeis e consultoria Atlassian. Ao longo da carreira, liderou equipes de desenvolvimento, implementou metodologias ágeis (Scrum, Kanban, SAFe) e se especializou nas ferramentas do ecossistema Atlassian — especialmente Jira e Confluence. Certificado pela Atlassian (ACP-620 e ACP-120), atua hoje como Sr. Atlassian Consultant na Modus Create, ajudando empresas a extrair o máximo das ferramentas de gestão de projetos.',
    timelineTitle: 'Trajetória',
    timelineSubtitle: 'Passe o mouse sobre cada experiência para ver os detalhes',
    certsTitle: 'Certificações',
    hoverHint: 'ver mais ↓',
    present: 'Presente',
  },

  // ─── Games page ───────────────────────────────────────────────────────────
  games: {
    metaDescription: "Os jogos mais jogados de Leonardo Escuciato — dados ao vivo da Steam.",
    heroBadge: 'PLAYER ONE READY',
    heroTitleNeon: 'MEUS',
    heroTitleRest: ' JOGOS',
    heroSubtitle: 'Os últimos jogos que passei horas destruindo na Steam.',
    recentHeading: '// JOGANDO RECENTEMENTE',
    recentBadge: 'ÚLTIMAS 2 SEMANAS',
    topHeading: '// JOGOS MAIS JOGADOS',
    topBadge: 'ALL TIME',
    emptyRecent: 'Nenhum jogo jogado nas últimas 2 semanas.',
    emptyTop: 'Nenhum dado de biblioteca encontrado na Steam.',
    activeLabel: 'Jogado recentemente',
    activeBadge: 'ATIVO',
    weeksLabel: 'nas últimas 2 semanas',
    totalLabel: 'no total',
    recentLabel: 'recentes',
    coverAlt: 'Capa de',
  },

  // ─── Blog listing ─────────────────────────────────────────────────────────
  blog: {
    metaDescription: 'Reflexões sobre transformação ágil, ferramentas Atlassian, liderança de times e tecnologia.',
    pageTitle: 'Blog',
    subtitle: 'Reflexões sobre transformação ágil, ferramentas Atlassian, liderança de times e tecnologia.',
    emptyTitle: 'Ainda sem posts',
    emptyText: 'Volte em breve — o conteúdo está a caminho.',
    readMore: 'Ler mais',
    publishedOn: 'Publicado em',
    by: 'por',
  },

  // ─── Blog post ────────────────────────────────────────────────────────────
  blogPost: {
    backToBlog: 'Voltar ao Blog',
    by: 'por',
  },

  // ─── Login ────────────────────────────────────────────────────────────────
  login: {
    title: 'Acesso Admin',
    subtitle: 'Informe sua senha para continuar.',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Digite a senha admin',
    submitButton: 'Entrar',
    errorMessage: 'Senha incorreta. Tente novamente.',
  },

  // ─── Sobre o Site ─────────────────────────────────────────────────────────
  sobreSite: {
    pageTitle: 'Sobre o Site',
    metaDescription: 'Como este site foi construído: stack, arquitetura, deploy automatizado e guia para replicar do zero.',
    heroBadge: 'Documentação Técnica',
    heroTitle: 'Sobre o Site',
    heroDesc: 'Como este site foi construído — stack, arquitetura, deploy automatizado e um guia completo para qualquer pessoa replicar essa estrutura do zero.',
    heroCollabNote: 'Desenvolvido em colaboração com',
    heroCollabUsing: 'usando o',
    heroCollabSuffix: '— uma CLI para desenvolvimento assistido por IA.',
    sidebarAriaLabel: 'Navegação da documentação',
    sidebarLabel: 'Nesta página',
    nav: {
      overview: '1. Visão Geral',
      stack: '2. Stack de Tecnologias',
      architecture: '3. Arquitetura',
      local: '4. Rodar Localmente',
      deploy: '5. Deploy',
      agents: '6. Agentes Claude Code',
      guide: '7. Guia do Zero',
      ai: '9. Usando AI',
      i18n: '8. Internacionalização',
    },
    sections: {
      visaoGeral: {
        title: 'Visão Geral',
        desc1: 'Este é um site pessoal moderno com <strong>Server-Side Rendering (SSR)</strong> construído em <strong>Astro</strong>. Vai além de uma simples página estática: inclui um blog com editor de texto rico, área de games integrada com a Steam API em tempo real, e um sistema de deploy completamente automatizado via Git hooks.',
        desc2: 'Todo o desenvolvimento foi feito em colaboração com Claude (Anthropic) usando o <strong>Claude Code</strong> — uma interface de linha de comando que permite desenvolvimento assistido por IA diretamente no terminal, com acesso ao sistema de arquivos, Git e servidor.',
        desc3: 'O projeto utiliza um conjunto de <strong>agentes especializados</strong> que automatizam tarefas de frontend, infraestrutura, qualidade e segurança — todos coordenados por linguagem natural.',
        featureBlog: 'Blog com Editor Rico',
        featureBlogDesc: 'TipTap + SQLite, área admin protegida por JWT',
        featureGames: 'Games ao Vivo',
        featureGamesDesc: 'Steam API com dados de jogos em tempo real',
        featureDeploy: 'Deploy Automatizado',
        featureDeployDesc: 'git push → build → restart em segundos',
        featureTls: 'TLS Automático',
        featureTlsDesc: "Traefik + Let's Encrypt sem configuração manual",
      },
      stack: {
        title: 'Stack de Tecnologias',
        subtitleApp: 'Aplicação',
        subtitleInfra: 'Infraestrutura',
        subtitleDev: 'Desenvolvimento',
        colTech: 'Tecnologia',
        colVersion: 'Versão',
        colRole: 'Função',
        colTool: 'Ferramenta',
        whyBtn: 'Por quê? ↓',
      },
      arquitetura: {
        title: 'Arquitetura',
        desc: 'O tráfego percorre quatro camadas antes de chegar à aplicação. Cada camada tem uma responsabilidade única e bem definida.',
        diagramAriaLabel: 'Diagrama de arquitetura do site',
        visitor: 'Visitante',
        whyTitle: 'Por que cada camada?',
        whyTraefik: 'gerencia TLS e certificados Let\'s Encrypt automaticamente. Sem ele, renovar HTTPS seria um processo manual e propenso a erros.',
        whyNginx: 'atua como buffer e proxy entre o mundo externo e o processo Node.js. Permite configurações de headers, caching e logs independentes da aplicação.',
        whyPm2: 'garante que o processo Node.js reinicie automaticamente após falhas ou reinicializações do servidor.',
        whyAstro: 'renderiza HTML no servidor, garantindo boa performance, SEO correto e suporte a lógica dinâmica (banco de dados, autenticação).',
      },
      local: {
        title: 'Como Rodar Localmente',
        prereq: '<strong>Pré-requisitos:</strong> Node.js 18+, npm, Git.',
        cloneTitle: 'Clone e instale',
        envTitle: 'Variáveis de ambiente',
        envDesc: 'Crie um arquivo <code class="inline-code">.env</code> na raiz do projeto com as seguintes variáveis:',
        calloutSteam: 'As variáveis <code class="inline-code">STEAM_API_KEY</code> e <code class="inline-code">STEAM_ID</code> são opcionais. Sem elas, a página de Games exibirá um estado vazio mas o restante do site funcionará normalmente.',
      },
      deploy: {
        title: 'Deploy',
        desc: 'O deploy é totalmente automatizado via um <strong>Git hook</strong> no servidor. Basta fazer push para o remote de produção.',
        flowTitle: 'Fluxo de deploy',
        autoTitle: 'O que acontece automaticamente no servidor',
        autoDesc: 'O hook <code class="inline-code">post-receive</code> executa em sequência:',
        step1Title: 'Checkout do código',
        step1Desc: 'O código é extraído do repositório bare para <code class="inline-code">/root/WebSite/source</code>',
        step2Desc: 'Instala dependências de forma determinística a partir do <code class="inline-code">package-lock.json</code>',
        step3Desc: 'Gera o bundle SSR otimizado para produção',
        step4Desc: 'Reinicia o processo Node.js com zero downtime percebido',
        calloutWarning: 'O arquivo <code class="inline-code">.env</code> no servidor <strong>deve existir antes do primeiro build</strong>. Se você adicionar novas variáveis ao projeto, é necessário atualizá-las no servidor e fazer um novo deploy.',
      },
      agentes: {
        title: 'Agentes Claude Code',
        desc: 'Este projeto utiliza <strong>Claude Code</strong> com um sistema de agentes especializados definidos em <code class="inline-code">.claude/agents/</code>. Cada agente tem um domínio de responsabilidade claro, e todos são coordenados por linguagem natural através do <em>site-orchestrator</em>.',
        badgeCoord: 'Coordenador',
        descOrchestrator: 'Interpreta pedidos em linguagem natural e delega para os agentes corretos. Ponto de entrada para toda interação com o projeto.',
        badgeFrontend: 'Frontend',
        descWebDev: 'Páginas Astro, componentes React, estilos, configurações de build, commits e push para produção.',
        badgeInfra: 'Infra',
        descDevops: 'Nginx, Docker, PM2, pipeline de deploy, diagnósticos do servidor via SSH.',
        badgeQa: 'QA',
        descQa: 'Inspeciona o site em busca de bugs visuais, erros funcionais e regressões após deploys.',
        badgeSec: 'Segurança',
        descSec: 'Audita o repositório por credenciais expostas, dados sensíveis e vulnerabilidades.',
        callout: 'O Claude Code não substitui o desenvolvedor — ele amplifica a capacidade de execução. Decisões de arquitetura, revisão de código e validação final sempre ficam com o humano.',
      },
      guia: {
        title: 'Guia: Construa um Site Igual do Zero',
        desc: 'Passo a passo para replicar essa arquitetura completa em qualquer VPS. Os placeholders <code class="inline-code">SEU_SERVIDOR</code>, <code class="inline-code">SEU_DOMINIO</code> e <code class="inline-code">meusite</code> devem ser substituídos pelos seus valores reais.',
        diagramAriaLabel: 'Diagrama do fluxo de deploy',
        diagramDev: 'DESENVOLVEDOR',
        diagramServer: 'SERVIDOR VPS',
        diagramVisitor: 'VISITANTE',
        step71Title: 'Preparar o Servidor VPS',
        step71CodeTitle: 'Servidor — instalar Node.js e PM2',
        step72Title: 'Configurar o Repositório Git Bare',
        step72CodeTitle: 'Servidor — criar repositório bare',
        step73Title: 'Criar o Hook de Deploy',
        step73CodeTitle: 'Servidor — criar post-receive hook',
        step73FileContent: 'Conteúdo do arquivo:',
        step74Title: 'Configurar Nginx + Traefik com Docker',
        step74NginxDesc: 'Crie o arquivo de configuração do Nginx:',
        step74DockerDesc: 'Crie o Docker Compose:',
        step74UpTitle: 'Subir o container',
        step75Title: 'Criar o Projeto Astro',
        step75CodeTitle: 'Local — criar projeto e instalar dependências',
        step76Title: 'Configurar Remote e Fazer o Primeiro Deploy',
        step76CodeTitle: 'Local + Servidor — primeiro deploy',
        step76Callout: 'Após o push, o hook executa automaticamente. Em menos de um minuto seu site estará disponível em <code class="inline-code">https://SEU_DOMINIO</code> com TLS configurado.',
      },
      usandoAI: {
        title: 'Usando AI',
        desc1: 'Todo este site foi construído usando o <strong>Claude Code</strong> — uma CLI que permite que um modelo de IA leia arquivos, escreva código, acesse o servidor via SSH e gerencie o ciclo completo de desenvolvimento. O processo humano foi quase inteiramente de <em>direção</em>: descrever o que queria, revisar o resultado e aprovar ou pedir ajustes.',
        desc2: 'Com os dois prompts abaixo, qualquer pessoa pode replicar este projeto completo — do zero ao site no ar — com no máximo <strong>1 comando manual</strong>.',
        prereqTitle: 'Antes de começar — o que você precisa ter',
        prereq1: 'Claude Code instalado',
        prereq1Detail: ' — <code class="inline-code">npm install -g @anthropic-ai/claude-code</code>',
        prereq2: 'Node.js 20+ local',
        prereq2Detail: ' — para rodar o projeto durante o desenvolvimento',
        prereq3: 'VPS com Ubuntu 24.04',
        prereq3Detail: ' — Docker instalado, Traefik rodando com um wildcard/domínio configurado',
        prereq4: 'Acesso root ao servidor via SSH',
        prereq4Detail: ' — o agente vai precisar executar comandos no servidor',
        prereq5: 'Chave da Steam API',
        prereq5Detail: ' — opcional, só se quiser a integração com Steam na página de Games',
        gatherTitle: 'Tenha em mãos antes de iniciar:',
        gatherItems: [
          'IP do seu servidor e senha root',
          'Domínio ou subdomínio que aponta para o servidor',
          'Seu currículo / experiências profissionais (texto ou PDF)',
          'Uma senha para o admin do blog e uma chave JWT (qualquer string longa aleatória)',
          'Steam ID ou vanity URL (opcional)',
        ],
        prompt1Badge: 'Prompt 1 de 2',
        prompt1Title: 'Construir o projeto + configurar o servidor',
        prompt1Desc: 'Cole este prompt no Claude Code a partir de uma pasta vazia no seu computador. O agente vai criar o projeto completo localmente <em>e</em> configurar o servidor — ao final ele vai exibir a chave SSH pública que precisa ser autorizada no servidor.',
        prompt1CodeTitle: 'Claude Code — Prompt 1',
        prompt1Body: `Quero construir um site pessoal usando Astro SSR e publicá-lo em um VPS.
Ao final deste prompt você vai ter:
1. O projeto completo rodando localmente
2. O servidor configurado com Nginx + PM2 + pipeline de deploy via Git hook
3. Exibida na tela a chave SSH pública que precisa ser autorizada no servidor

Informações do projeto:
- Meu nome: [SEU NOME]
- Profissão atual: [SUA PROFISSÃO]
- Cidade: [SUA CIDADE]
- Hobbies: [HOBBIES]
- Experiências profissionais: [COLE AQUI OU INFORME CAMINHO DO CV]

Informações do servidor:
- IP: [IP_DO_SERVIDOR]
- Usuário: root
- Domínio/host: [SEU_DOMINIO]
- Traefik já está rodando no servidor com Let's Encrypt configurado

Stack desejada (não alterar):
- Astro SSR com @astrojs/node adapter (standalone)
- React para componentes interativos
- TipTap para o editor do blog
- SQLite (better-sqlite3) para os posts
- JWT (biblioteca jose) para autenticação do admin
- PM2 para gerenciar o processo Node.js
- Nginx (Docker) como proxy reverso para a porta 4321

Páginas que o site deve ter:
1. Home — apresentação pessoal com hobbies
2. Profissional — timeline de carreira com tooltip no hover
3. Blog — listagem de posts + editor admin com TipTap (protegido por JWT)
4. Games — integração opcional com Steam API (seção pode ficar vazia por ora)
5. Sobre o Site — documentação técnica do projeto

Tarefa dos agentes:
- web-dev-craftsman: criar todo o projeto Astro localmente com a stack acima
- vps-devops-manager: configurar o servidor (repositório bare + hook de deploy + Nginx Docker + PM2)

Ao finalizar:
- Mostrar o conteúdo do arquivo ~/.ssh/id_ed25519.pub (chave SSH pública)
- Instruir o que precisa ser feito antes do Prompt 2`,
        manualBadge: 'Ação Manual',
        manualTitle: 'Autorizar a chave SSH no servidor',
        manualDesc: 'Esta é a única etapa manual. O Claude Code não pode se autorizar no servidor sem que você execute este comando uma vez. Substitua pela chave exibida no Prompt 1.',
        manualCodeTitle: 'Executar no servidor (via SSH)',
        manualComment1: '# Conectar ao servidor',
        manualComment2: '# Adicionar a chave SSH pública do Claude Code',
        manualComment3: '# Sair do servidor',
        prompt2Badge: 'Prompt 2 de 2',
        prompt2Title: 'Criar .env + deploy + verificação',
        prompt2Desc: 'Após autorizar a chave SSH, execute este segundo prompt na mesma sessão do Claude Code (ou em uma nova, dentro da pasta do projeto). O agente vai criar o arquivo <code class="inline-code">.env</code> no servidor, fazer o primeiro deploy e verificar se o site está no ar.',
        prompt2CodeTitle: 'Claude Code — Prompt 2',
        prompt2Body: `A chave SSH já foi autorizada no servidor. Agora execute as etapas finais:

1. vps-devops-manager: criar o arquivo .env no servidor em /root/MeuSite/source/.env com:
   ADMIN_PASSWORD=[SENHA_DO_ADMIN_DO_BLOG]
   JWT_SECRET=[STRING_ALEATORIA_COM_32_CHARS_MINIMO]
   HOST=0.0.0.0
   PORT=4321
   (Se quiser Steam: STEAM_API_KEY=[SUA_CHAVE_STEAM] e STEAM_ID=[SEU_STEAM_ID])

2. web-dev-craftsman: adicionar o remote de produção e fazer o primeiro deploy:
   git remote add production root@[IP_DO_SERVIDOR]:/root/repos/meusite.git
   git push production main

3. vps-devops-manager: verificar que o PM2 subiu corretamente após o deploy

4. qa-bug-hunter: acessar [SEU_DOMINIO] e verificar que o site está funcionando —
   checar home, blog, profissional e games

Ao final, exibir a URL pública do site.`,
        finalCallout: 'Pronto — site no ar com deploy automatizado. A partir daí, qualquer mudança é feita descrevendo em linguagem natural e confirmada com <code class="inline-code">git push production main</code>.',
      },
      i18n: {
        title: 'Internacionalização (i18n)',
        desc: 'O site suporta três idiomas — <strong>Português (PT)</strong>, <strong>English (EN)</strong> e <strong>Español (ES)</strong> — sem alterar as URLs. A troca de idioma é feita via cookie <code class="inline-code">lang</code>, lido no SSR a cada renderização.',
        archTitle: 'Arquitetura',
        archItem1: 'Dicionários de tradução em TypeScript, tipados a partir do arquivo PT (fonte de verdade).',
        archItem2: 'Helper <code class="inline-code">useTranslations(lang)</code> e <code class="inline-code">getLang(cookies)</code> para leitura segura do cookie.',
        archItem3: 'Endpoint POST que seta o cookie <code class="inline-code">lang</code> (maxAge: 1 ano) e redireciona de volta via <code class="inline-code">Referer</code>.',
        archItem4: 'Três botões <code class="inline-code">PT | EN | ES</code> integrados ao Header, com o idioma ativo destacado.',
        howTitle: 'Como funciona em cada página SSR',
        howCodeTitle: 'Exemplo de uso em uma página',
        howComment: '// Usar nas templates:',
        callout: 'As páginas de administração (<code class="inline-code">/blog/admin</code>, <code class="inline-code">/blog/new</code>) permanecem em português — são áreas internas sem necessidade de internacionalização. As APIs também não foram alteradas.',
      },
    },
  },

  // ─── Professional experiences ─────────────────────────────────────────────
  experiences: [
    {
      role: 'Sr. Atlassian Consultant',
      company: 'Modus Create',
      period: 'Jan 2022 – Presente',
      tooltip: 'Implementação de setups de Project Management com ferramentas Atlassian para diferentes empresas. Grande experiência com Jira Automation, Advanced Roadmaps e adaptação de processos ágeis a diferentes contextos organizacionais.',
    },
    {
      role: 'Squad Leader',
      company: 'Modus Create',
      period: 'Jun 2021 – Fev 2022',
      tooltip: 'Liderança de cerimônias ágeis, organização do Jira para relatórios e métricas, trabalho em formato Kanban com foco em qualidade, distribuição de tarefas e comunicação com o cliente.',
    },
    {
      role: 'Transformation Lead',
      company: 'Zup Innovation',
      period: 'Out 2019 – Jun 2021',
      tooltip: 'Gestão da saúde financeira do projeto, liderança de rituais ágeis, aplicação da metodologia SAFe, extração de métricas via APIs do Jira e construção de dashboards de qualidade e previsibilidade.',
    },
    {
      role: 'Agile Coach & Jira Administrator',
      company: 'Softvaro',
      period: 'Set 2018 – Out 2019',
      tooltip: 'Melhoria da visibilidade do desenvolvimento de software através de metodologias ágeis. Administração do Jira com padrões customizados por cliente e extração de dados via APIs REST para métricas.',
    },
    {
      role: 'Scrum Master',
      company: 'CI&T',
      period: 'Set 2015 – Ago 2018 (Europa)',
      tooltip: 'Liderança de times como Scrum Master, melhorando processos e entrega através de métricas como Velocity e Produtividade. Deploy de MVP Mobile para grande empresa de bebidas na Europa, República Dominicana e México.',
    },
  ],

  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    builtWith: 'Construído com',
  },
} as const;

export type Translations = typeof pt;
