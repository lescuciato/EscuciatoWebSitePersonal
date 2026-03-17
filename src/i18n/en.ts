/**
 * English translations.
 */
import type { Translations } from './pt';

export const en: Translations = {
  // ─── Navigation ───────────────────────────────────────────────────────────
  nav: {
    home: 'Home',
    professional: 'Professional',
    blog: 'Blog',
    games: 'Games',
    about: 'About',
  },

  // ─── Home / Hero ──────────────────────────────────────────────────────────
  hero: {
    summary:
      'I live in Campinas, play tennis when my body lets me, and fire up the grill when it doesn\'t. Wine flows either way. On Sundays I cheer for Ponte Preta and call it a hobby.',
    contact: 'Contact',
    viewProfile: 'View professional profile →',
  },

  // ─── Home / Hobbies ───────────────────────────────────────────────────────
  hobbies: {
    sectionTitle: 'Interests',
    items: [
      { emoji: '🎾', label: 'Tennis', description: 'On the court whenever possible' },
      { emoji: '🎮', label: 'Video Games', description: 'Digital adventures of all kinds' },
      { emoji: '🍖', label: 'Good Food', description: 'BBQ, wine, and great company' },
      { emoji: '⚽', label: 'Football', description: 'Ponte Preta supporter' },
      { emoji: '🐣', label: 'Pedrinho is coming!', description: 'Pedro arrives in August!' },
    ],
  },

  // ─── Professional page ────────────────────────────────────────────────────
  professional: {
    pageTitle: 'Professional Profile',
    metaDescription:
      'Leonardo Escuciato — Sr. Atlassian Consultant. Background in agile management, Atlassian consulting, and team leadership.',
    summaryText:
      'A professional with solid experience in agile team management and Atlassian consulting. Throughout his career, he has led development teams, implemented agile methodologies (Scrum, Kanban, SAFe), and specialized in Atlassian ecosystem tools — especially Jira and Confluence. Certified by Atlassian (ACP-620 and ACP-120), he currently works as a Sr. Atlassian Consultant at Modus Create, helping companies get the most out of their project management tools.',
    timelineTitle: 'Career',
    timelineSubtitle: 'Hover over each experience to see the details',
    certsTitle: 'Certifications',
    hoverHint: 'see more ↓',
    present: 'Present',
  },

  // ─── Games page ───────────────────────────────────────────────────────────
  games: {
    metaDescription: "Leonardo Escuciato's top played games of all time — pulled live from Steam.",
    heroBadge: 'PLAYER ONE READY',
    heroTitleNeon: 'MY',
    heroTitleRest: ' GAMES',
    heroSubtitle: 'The latest games I\'ve sunk hours into on Steam.',
    recentHeading: '// RECENTLY PLAYED',
    recentBadge: 'LAST 2 WEEKS',
    topHeading: '// MOST PLAYED GAMES',
    topBadge: 'ALL TIME',
    emptyRecent: 'No games played in the last 2 weeks.',
    emptyTop: 'No library data found on Steam.',
    activeLabel: 'Recently played',
    activeBadge: 'ACTIVE',
    weeksLabel: 'in the last 2 weeks',
    totalLabel: 'total',
    recentLabel: 'recent',
    coverAlt: 'Cover of',
  },

  // ─── Blog listing ─────────────────────────────────────────────────────────
  blog: {
    metaDescription: 'Thoughts on agile transformation, Atlassian tools, team leadership, and technology.',
    pageTitle: 'Blog',
    subtitle: 'Thoughts on agile transformation, Atlassian tools, team leadership, and technology.',
    emptyTitle: 'No posts yet',
    emptyText: 'Check back soon — content is on its way.',
    readMore: 'Read more',
    publishedOn: 'Published on',
    by: 'by',
  },

  // ─── Blog post ────────────────────────────────────────────────────────────
  blogPost: {
    backToBlog: 'Back to Blog',
    by: 'by',
  },

  // ─── Login ────────────────────────────────────────────────────────────────
  login: {
    title: 'Admin Access',
    subtitle: 'Enter your password to continue.',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter admin password',
    submitButton: 'Sign In',
    errorMessage: 'Incorrect password. Please try again.',
  },

  // ─── Sobre o Site ─────────────────────────────────────────────────────────
  sobreSite: {
    pageTitle: 'About This Site',
    metaDescription: 'How this site was built: stack, architecture, automated deploy and a guide to replicate it from scratch.',
    heroBadge: 'Technical Documentation',
    heroTitle: 'About This Site',
    heroDesc: 'How this site was built — stack, architecture, automated deploy and a complete guide for anyone to replicate this setup from scratch.',
    heroCollabNote: 'Developed in collaboration with',
    heroCollabUsing: 'using',
    heroCollabSuffix: '— a CLI for AI-assisted development.',
    sidebarAriaLabel: 'Documentation navigation',
    sidebarLabel: 'On this page',
    nav: {
      overview: '1. Overview',
      stack: '2. Technology Stack',
      architecture: '3. Architecture',
      local: '4. Run Locally',
      deploy: '5. Deploy',
      seguranca: '6. Security',
      agents: '7. Claude Code Agents',
      guide: '8. Guide from Scratch',
      ai: '10. Using AI',
      i18n: '9. Internationalization',
    },
    sections: {
      visaoGeral: {
        title: 'Overview',
        desc1: 'This is a modern personal website with <strong>Server-Side Rendering (SSR)</strong> built with <strong>Astro</strong>. It goes beyond a simple static page: it includes a blog with a rich text editor, a games area integrated with the Steam API in real time, and a fully automated deploy system via Git hooks.',
        desc2: 'All development was done in collaboration with Claude (Anthropic) using <strong>Claude Code</strong> — a command-line interface that enables AI-assisted development directly in the terminal, with access to the file system, Git and the server.',
        desc3: 'The project uses a set of <strong>specialized agents</strong> that automate frontend, infrastructure, quality and security tasks — all coordinated by natural language.',
        featureBlog: 'Blog with Rich Editor',
        featureBlogDesc: 'TipTap + SQLite, admin area protected by JWT',
        featureGames: 'Live Games',
        featureGamesDesc: 'Steam API with real-time game data',
        featureDeploy: 'Automated Deploy',
        featureDeployDesc: 'git push → build → restart in seconds',
        featureTls: 'Automatic TLS',
        featureTlsDesc: "Traefik + Let's Encrypt with no manual configuration",
      },
      stack: {
        title: 'Technology Stack',
        subtitleApp: 'Application',
        subtitleInfra: 'Infrastructure',
        subtitleDev: 'Development',
        colTech: 'Technology',
        colVersion: 'Version',
        colRole: 'Role',
        colTool: 'Tool',
        whyBtn: 'Why? ↓',
      },
      arquitetura: {
        title: 'Architecture',
        desc: 'Traffic passes through four layers before reaching the application. Each layer has a single, well-defined responsibility.',
        diagramAriaLabel: 'Site architecture diagram',
        visitor: 'Visitor',
        whyTitle: 'Why each layer?',
        whyTraefik: 'manages TLS and Let\'s Encrypt certificates automatically. Without it, renewing HTTPS would be a manual and error-prone process.',
        whyNginx: 'acts as a buffer and proxy between the outside world and the Node.js process. Allows header configuration, caching and logging independent of the application.',
        whyPm2: 'ensures the Node.js process restarts automatically after failures or server reboots.',
        whyAstro: 'renders HTML on the server, ensuring good performance, correct SEO and support for dynamic logic (database, authentication).',
      },
      local: {
        title: 'Running Locally',
        prereq: '<strong>Prerequisites:</strong> Node.js 18+, npm, Git.',
        cloneTitle: 'Clone and install',
        envTitle: 'Environment variables',
        envDesc: 'Create a <code class="inline-code">.env</code> file at the project root with the following variables:',
        calloutSteam: 'The <code class="inline-code">STEAM_API_KEY</code> and <code class="inline-code">STEAM_ID</code> variables are optional. Without them, the Games page will show an empty state but the rest of the site will work normally.',
      },
      deploy: {
        title: 'Deploy',
        desc: 'The deploy is fully automated via a <strong>Git hook</strong> on the server. Just push to the production remote.',
        flowTitle: 'Deploy flow',
        autoTitle: 'What happens automatically on the server',
        autoDesc: 'The <code class="inline-code">post-receive</code> hook runs in sequence:',
        step1Title: 'Code checkout',
        step1Desc: 'The code is extracted from the bare repository to <code class="inline-code">/root/WebSite/source</code>',
        step2Desc: 'Installs dependencies deterministically from <code class="inline-code">package-lock.json</code>',
        step3Desc: 'Generates the optimized SSR bundle for production',
        step4Desc: 'Restarts the Node.js process with zero perceived downtime',
        calloutWarning: 'The <code class="inline-code">.env</code> file on the server <strong>must exist before the first build</strong>. If you add new variables to the project, you must update them on the server and run a new deploy.',
        persistenceTitle: 'Persistence after reboot',
        persistenceDesc: 'The Node.js process is managed by <strong>PM2</strong> with an <code class="inline-code">ecosystem.config.cjs</code> file that enforces <code class="inline-code">HOST=0.0.0.0</code>. The <code class="inline-code">pm2-root.service</code> is registered with <strong>systemd</strong>, ensuring that PM2 — and the site — starts automatically after any server reboot. Docker containers (Nginx, Traefik, n8n) also use <code class="inline-code">restart=always</code> policy.',
      },
      seguranca: {
        title: '6. Security',
        intro: 'The admin area is protected by a JWT authentication layer. Below are the security practices adopted.',
        item1Title: 'Secure Session Cookies',
        item1Desc: 'Authentication cookies use the <code>Secure</code> attribute, ensuring they are only transmitted over HTTPS connections.',
        item2Title: 'XSS Prevention',
        item2Desc: 'Blog post content is sanitized using an allowlist approach before rendering, blocking malicious scripts.',
        item3Title: 'Generic Error Responses',
        item3Desc: 'Error responses are intentionally generic to avoid exposing internal system details.',
        item4Title: 'Login Rate Limiting',
        item4Desc: 'The login endpoint has attempt limiting to hinder brute-force attacks.',
        item5Title: 'Session Expiry',
        item5Desc: 'Sessions expire after a limited period of time, reducing the exposure window if a token is compromised.',
        item6Title: 'Token Invalidation on Logout',
        item6Desc: 'Tokens are explicitly invalidated on logout, preventing reuse even if they were previously captured.',
        item7Title: 'Constant-Time Comparison',
        item7Desc: 'Password verification uses constant-time comparison to prevent timing attacks.',
        item8Title: 'Open Redirect Protection',
        item8Desc: 'Redirect parameters are validated to prevent attackers from redirecting users to external domains.',
      },
      agentes: {
        title: 'Claude Code Agents',
        desc: 'This project uses <strong>Claude Code</strong> with a system of specialized agents defined in <code class="inline-code">.claude/agents/</code>. Each agent has a clear domain of responsibility, and all are coordinated by natural language through the <em>site-orchestrator</em>.',
        badgeCoord: 'Coordinator',
        descOrchestrator: 'Interprets natural language requests and delegates to the correct agents. Entry point for all project interactions.',
        badgeFrontend: 'Frontend',
        descWebDev: 'Astro pages, React components, styles, build configurations, commits and push to production.',
        badgeInfra: 'Infra',
        descDevops: 'Nginx, Docker, PM2, deploy pipeline, server diagnostics via SSH.',
        badgeQa: 'QA',
        descQa: 'Inspects the site for visual bugs, functional errors and regressions after deploys.',
        badgeSec: 'Security',
        descSec: 'Audits the repository for exposed credentials, sensitive data and vulnerabilities.',
        callout: 'Claude Code does not replace the developer — it amplifies execution capacity. Architecture decisions, code review and final validation always stay with the human.',
      },
      guia: {
        title: 'Guide: Build an Identical Site from Scratch',
        desc: 'Step by step to replicate this complete architecture on any VPS. The placeholders <code class="inline-code">YOUR_SERVER</code>, <code class="inline-code">YOUR_DOMAIN</code> and <code class="inline-code">mysite</code> should be replaced with your real values.',
        diagramAriaLabel: 'Deploy flow diagram',
        diagramDev: 'DEVELOPER',
        diagramServer: 'VPS SERVER',
        diagramVisitor: 'VISITOR',
        step71Title: 'Prepare the VPS Server',
        step71CodeTitle: 'Server — install Node.js and PM2',
        step72Title: 'Set Up the Bare Git Repository',
        step72CodeTitle: 'Server — create bare repository',
        step73Title: 'Create the Deploy Hook',
        step73CodeTitle: 'Server — create post-receive hook',
        step73FileContent: 'File contents:',
        step74Title: 'Configure Nginx + Traefik with Docker',
        step74NginxDesc: 'Create the Nginx configuration file:',
        step74DockerDesc: 'Create the Docker Compose file:',
        step74UpTitle: 'Start the container',
        step75Title: 'Create the Astro Project',
        step75CodeTitle: 'Local — create project and install dependencies',
        step76Title: 'Configure Remote and Run the First Deploy',
        step76CodeTitle: 'Local + Server — first deploy',
        step76Callout: 'After the push, the hook runs automatically. In less than a minute your site will be available at <code class="inline-code">https://YOUR_DOMAIN</code> with TLS configured.',
      },
      usandoAI: {
        title: 'Using AI',
        desc1: 'This entire site was built using <strong>Claude Code</strong> — a CLI that allows an AI model to read files, write code, access the server via SSH and manage the complete development cycle. The human process was almost entirely one of <em>direction</em>: describe what was wanted, review the result and approve or request adjustments.',
        desc2: 'With the two prompts below, anyone can replicate this complete project — from scratch to live site — with at most <strong>1 manual command</strong>.',
        prereqTitle: 'Before you start — what you need',
        prereq1: 'Claude Code installed',
        prereq1Detail: ' — <code class="inline-code">npm install -g @anthropic-ai/claude-code</code>',
        prereq2: 'Node.js 20+ locally',
        prereq2Detail: ' — to run the project during development',
        prereq3: 'VPS with Ubuntu 24.04',
        prereq3Detail: ' — Docker installed, Traefik running with a wildcard/domain configured',
        prereq4: 'Root access to the server via SSH',
        prereq4Detail: ' — the agent will need to run commands on the server',
        prereq5: 'Steam API Key',
        prereq5Detail: ' — optional, only if you want the Steam integration on the Games page',
        gatherTitle: 'Have ready before starting:',
        gatherItems: [
          'Your server IP and root password',
          'Domain or subdomain pointing to the server',
          'Your resume / professional experience (text or PDF)',
          'A strong password for the blog admin (mix uppercase, lowercase, numbers and symbols) and a JWT secret (random string, minimum 32 characters)',
          'Steam ID or vanity URL (optional)',
        ],
        prompt1Badge: 'Prompt 1 of 2',
        prompt1Title: 'Build the project + configure the server',
        prompt1Desc: 'Paste this prompt into Claude Code from an empty folder on your computer. The agent will create the complete project locally <em>and</em> configure the server — at the end it will display the public SSH key that needs to be authorized on the server.',
        prompt1CodeTitle: 'Claude Code — Prompt 1',
        prompt1Body: `I want to build a personal website using Astro SSR and deploy it to a VPS.
By the end of this prompt you will have:
1. The complete project running locally
2. The server configured with Nginx + PM2 + automated deploy pipeline via Git hook
3. The SSH public key displayed on screen that needs to be authorized on the server

Project information:
- My name: [YOUR NAME]
- Current role: [YOUR ROLE]
- City: [YOUR CITY]
- Hobbies: [HOBBIES]
- Professional experience: [PASTE HERE OR PROVIDE PATH TO YOUR CV]

Server information:
- IP: [SERVER_IP]
- User: root
- Domain/host: [YOUR_DOMAIN]
- Traefik is already running on the server with Let's Encrypt configured

Desired stack (do not change):
- Astro SSR with @astrojs/node adapter (standalone)
- React for interactive components
- TipTap for the blog editor
- SQLite (better-sqlite3) for posts
- JWT (jose library) for admin authentication
- PM2 to manage the Node.js process
- Nginx (Docker) as reverse proxy to port 4321
- sanitize-html for blog content sanitization

Pages the site should have:
1. Home — personal presentation with hobbies
2. Professional — career timeline with hover tooltip
3. Blog — post listing + admin editor with TipTap (JWT protected)
4. Games — optional Steam API integration (section can be empty for now)
5. About — technical documentation of the project

Mandatory security requirements (apply all):
- Rate limiting on the login endpoint to hinder brute-force attacks
- JWT token revocation on logout (revoke server-side, not just clear the cookie)
- Constant-time password comparison (crypto.timingSafeEqual) to prevent timing attacks
- Session cookie with Secure flag over HTTPS connections
- Blog HTML sanitization with allowlist via sanitize-html before rendering
- Redirect parameter validation to prevent open redirect attacks
- Generic error responses to avoid leaking internal system details
- Session with limited expiry time

Agent tasks:
- web-dev-craftsman: create the entire Astro project locally with the stack above, applying all security requirements
- vps-devops-manager: configure the server (bare repo + deploy hook + Nginx Docker + PM2)
- security-auditor: review the generated code before the first deploy

When done:
- Show the contents of ~/.ssh/id_ed25519.pub (public SSH key)
- Instruct what needs to be done before Prompt 2`,
        manualBadge: 'Manual Step',
        manualTitle: 'Authorize the SSH key on the server',
        manualDesc: 'This is the only manual step. Claude Code cannot authorize itself on the server without you running this command once. Replace with the key displayed in Prompt 1.',
        manualCodeTitle: 'Run on the server (via SSH)',
        manualComment1: '# Connect to the server',
        manualComment2: "# Add Claude Code's public SSH key",
        manualComment3: '# Exit the server',
        prompt2Badge: 'Prompt 2 of 2',
        prompt2Title: 'Create .env + deploy + verification',
        prompt2Desc: 'After authorizing the SSH key, run this second prompt in the same Claude Code session (or a new one, inside the project folder). The agent will create the <code class="inline-code">.env</code> file on the server, do the first deploy and verify the site is live.',
        prompt2CodeTitle: 'Claude Code — Prompt 2',
        prompt2Body: `The SSH key has already been authorized on the server. Now execute the final steps:

1. vps-devops-manager: create the .env file on the server at /root/MySite/source/.env with:
   ADMIN_PASSWORD=[STRONG PASSWORD — e.g. MyP@ssw0rd2025! — use uppercase, lowercase, numbers and symbols]
   JWT_SECRET=[RANDOM STRING MIN 32 CHARS — generate with: openssl rand -base64 48]
   HOST=0.0.0.0
   PORT=4321
   (If you want Steam: STEAM_API_KEY=[YOUR_STEAM_KEY] and STEAM_ID=[YOUR_STEAM_ID])

2. web-dev-craftsman: add the production remote and make the first deploy:
   git remote add production root@[SERVER_IP]:/root/repos/mysite.git
   git push production main

3. vps-devops-manager: verify that PM2 started correctly after the deploy

4. security-auditor: verify that no credentials are exposed in the repository
   and that the authentication flow in production is working correctly

5. qa-bug-hunter: access [YOUR_DOMAIN] and verify the site is working —
   check home, blog, professional and games

When done, display the site's public URL.`,
        finalCallout: 'Done — site live with automated deploy. From there, any change is made by describing it in natural language and confirmed with <code class="inline-code">git push production main</code>.',
      },
      i18n: {
        title: 'Internationalization (i18n)',
        desc: 'The site supports three languages — <strong>Português (PT)</strong>, <strong>English (EN)</strong> and <strong>Español (ES)</strong> — without changing URLs. Language switching is done via the <code class="inline-code">lang</code> cookie, read on the SSR at every render.',
        archTitle: 'Architecture',
        archItem1: 'TypeScript translation dictionaries, typed from the PT file (source of truth).',
        archItem2: 'Helpers <code class="inline-code">useTranslations(lang)</code> and <code class="inline-code">getLang(cookies)</code> for safe cookie reading.',
        archItem3: 'POST endpoint that sets the <code class="inline-code">lang</code> cookie (maxAge: 1 year) and redirects back via <code class="inline-code">Referer</code>.',
        archItem4: 'Three <code class="inline-code">PT | EN | ES</code> buttons integrated into the Header, with the active language highlighted.',
        howTitle: 'How it works on each SSR page',
        howCodeTitle: 'Usage example in a page',
        howComment: '// Use in templates:',
        callout: 'The admin pages (<code class="inline-code">/blog/admin</code>, <code class="inline-code">/blog/new</code>) remain in Portuguese — they are internal areas with no need for internationalization. The APIs were also not changed.',
      },
    },
  },

  // ─── Professional experiences ─────────────────────────────────────────────
  experiences: [
    {
      role: 'Sr. Atlassian Consultant',
      company: 'Modus Create',
      period: 'Jan 2022 – Present',
      tooltip: 'Implementation of Project Management setups with Atlassian tools for various companies. Extensive experience with Jira Automation, Advanced Roadmaps, and adapting agile processes to different organizational contexts.',
    },
    {
      role: 'Squad Leader',
      company: 'Modus Create',
      period: 'Jun 2021 – Feb 2022',
      tooltip: 'Leadership of agile ceremonies, Jira organization for reporting and metrics, work in Kanban format focused on quality, task distribution, and client communication.',
    },
    {
      role: 'Transformation Lead',
      company: 'Zup Innovation',
      period: 'Oct 2019 – Jun 2021',
      tooltip: 'Financial health management of the project, leadership of agile rituals, SAFe methodology application, metrics extraction via Jira APIs, and construction of quality and predictability dashboards.',
    },
    {
      role: 'Agile Coach & Jira Administrator',
      company: 'Softvaro',
      period: 'Sep 2018 – Oct 2019',
      tooltip: 'Improving software development visibility through agile methodologies. Jira administration with custom standards per client and data extraction via REST APIs for metrics.',
    },
    {
      role: 'Scrum Master',
      company: 'CI&T',
      period: 'Sep 2015 – Aug 2018 (Europe)',
      tooltip: 'Leading teams as Scrum Master, improving processes and delivery through metrics such as Velocity and Productivity. MVP Mobile deployment for a major beverage company in Europe, Dominican Republic, and Mexico.',
    },
  ],

  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    builtWith: 'Built with',
  },
};
