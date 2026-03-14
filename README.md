# Leonardo Escuciato — Personal Website

[![Live](https://img.shields.io/badge/live-srv1103792.hstgr.cloud-6366f1?style=flat-square)](https://srv1103792.hstgr.cloud)
[![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01?style=flat-square&logo=astro)](https://astro.build)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Personal website built with Astro SSR, featuring a blog with a rich text editor, Steam API integration, JWT authentication, and full i18n support (PT / EN / ES). Deployed to a Hostinger VPS via automated Git hooks.

> Developed in collaboration with [Claude Code](https://claude.ai/code) (Anthropic).

---

## Features

- **Blog** — Rich text editor powered by TipTap, posts stored in SQLite, admin area protected by JWT
- **Games** — Live Steam API integration showing recently played and top played games
- **Professional** — Career timeline with hover tooltips and Atlassian certifications
- **i18n** — Cookie-based language switcher (PT / EN / ES) with scroll position restoration
- **Auto Deploy** — `git push production main` triggers a full build and PM2 restart on the server
- **TLS** — Automatic HTTPS via Traefik + Let's Encrypt

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) (SSR, `@astrojs/node` standalone adapter) |
| UI | [React 18](https://react.dev) islands + [Tailwind CSS](https://tailwindcss.com) |
| Rich Text | [TipTap 2](https://tiptap.dev) |
| Database | [SQLite](https://www.sqlite.org) via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) |
| Auth | [jose](https://github.com/panva/jose) (JWT) |
| Process Manager | [PM2](https://pm2.keymetrics.io) |
| Reverse Proxy | Nginx (Docker) → [Traefik v3](https://traefik.io) |
| Hosting | Hostinger VPS — Ubuntu 24.04 LTS |

---

## Project Structure

```
src/
├── components/
│   ├── home/          # Hero, Hobbies
│   ├── layout/        # Header, Footer, LanguageSwitcher
│   └── blog/          # TipTapEditor (React)
├── i18n/
│   ├── pt.ts          # Portuguese dictionary (source of truth)
│   ├── en.ts          # English dictionary
│   ├── es.ts          # Spanish dictionary
│   └── index.ts       # getLang(), useTranslations()
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── auth.ts        # JWT helpers
│   ├── db.ts          # SQLite connection
│   └── steam.ts       # Steam API helpers
├── pages/
│   ├── api/           # REST endpoints (posts, auth, set-lang)
│   ├── blog/          # Blog listing, post view, admin, editor
│   ├── games/         # Steam integration
│   ├── index.astro    # Home
│   ├── profissional.astro
│   ├── sobre-o-site.astro
│   └── login.astro
└── styles/
    └── global.css
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/lescuciato/EscuciatoWebSitePersonal.git
cd EscuciatoWebSitePersonal
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
ADMIN_PASSWORD=your-admin-password
JWT_SECRET=your-jwt-secret-at-least-32-chars

# Optional — Steam integration
STEAM_API_KEY=your-steam-api-key
STEAM_ID=your-steam-id

HOST=0.0.0.0
PORT=4321
```

> **Note:** Astro/Vite resolves `import.meta.env` at **build time**. If you add new variables after building, you must rebuild.

### Development

```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Production build
npm run start      # Serve the production build
```

---

## Internationalization

The site supports three languages without URL changes. The active language is stored in a `lang` cookie.

```astro
import { getLang, useTranslations } from '../i18n/index';

const lang = getLang(Astro.cookies); // 'pt' | 'en' | 'es'
const t = useTranslations(lang);
```

To add a new translation key, update all three dictionaries: `src/i18n/pt.ts`, `en.ts`, and `es.ts`.

---

## Deploy

This project uses a bare Git repository on the VPS with a `post-receive` hook for zero-touch deploys.

### One-time setup

```bash
# Add the production remote (local machine)
git remote add production root@YOUR_SERVER_IP:/root/repos/website.git
```

### Deploy

```bash
git push production main
```

The hook automatically runs: `git checkout` → `npm ci` → `npm run build` → `pm2 restart website`

### Server requirements

- Ubuntu 24.04 LTS
- Docker (for Nginx + Traefik)
- Node.js 20+ via nvm
- PM2 globally installed
- Traefik configured with a domain pointing to the server

---

## Claude Code Agents

This project uses a multi-agent system defined in `.claude/agents/`:

| Agent | Responsibility |
|---|---|
| `site-orchestrator` | Interprets requests and delegates to the right agents |
| `web-dev-craftsman` | Astro pages, components, styles, i18n, commits |
| `vps-devops-manager` | Server, PM2, Docker, Nginx, deploy pipeline |
| `qa-bug-hunter` | Inspects the live site for bugs after deploys |
| `security-auditor` | Audits the repository for exposed credentials |

---

## Versioning

| Version | Description |
|---|---|
| `v1.1.0` | i18n PT/EN/ES + "Using AI" section + Pedrinho 🐣 |
| `v1.0.0` | Initial release — home, blog, games, professional, about |

---

## License

MIT © [Leonardo Escuciato](https://github.com/lescuciato)
