/**
 * Spanish translations.
 */
import type { Translations } from './pt';

export const es: Translations = {
  // ─── Navigation ───────────────────────────────────────────────────────────
  nav: {
    home: 'Inicio',
    professional: 'Profesional',
    blog: 'Blog',
    games: 'Games',
    about: 'Acerca de',
  },

  // ─── Home / Hero ──────────────────────────────────────────────────────────
  hero: {
    summary:
      'Vivo en Campinas, juego tenis cuando el cuerpo me lo permite y hago asado cuando no. Tomo vino en ambos casos. Los domingos, hincho por el Ponte Preta y lo llamo hobby.',
    contact: 'Contacto',
    viewProfile: 'Ver perfil profesional →',
  },

  // ─── Home / Hobbies ───────────────────────────────────────────────────────
  hobbies: {
    sectionTitle: 'Intereses',
    items: [
      { emoji: '🎾', label: 'Tenis', description: 'En las canchas siempre que puedo' },
      { emoji: '🎮', label: 'Videojuegos', description: 'Aventuras digitales de todo tipo' },
      { emoji: '🍖', label: 'Buena Mesa', description: 'Asado, vino y buena compañía' },
      { emoji: '⚽', label: 'Fútbol', description: 'Hincha del Ponte Preta' },
      { emoji: '🐣', label: '¡Pedrinho en camino!', description: '¡Pedro llega en agosto!' },
    ],
  },

  // ─── Professional page ────────────────────────────────────────────────────
  professional: {
    pageTitle: 'Perfil Profesional',
    metaDescription:
      'Leonardo Escuciato — Sr. Atlassian Consultant. Experiencia en gestión ágil, consultoría Atlassian y liderazgo de equipos.',
    summaryText:
      'Profesional con sólida experiencia en gestión de equipos ágiles y consultoría Atlassian. A lo largo de su carrera ha liderado equipos de desarrollo, implementado metodologías ágiles (Scrum, Kanban, SAFe) y se ha especializado en las herramientas del ecosistema Atlassian — especialmente Jira y Confluence. Certificado por Atlassian (ACP-620 y ACP-120), actualmente trabaja como Sr. Atlassian Consultant en Modus Create, ayudando a empresas a sacar el máximo provecho de sus herramientas de gestión de proyectos.',
    timelineTitle: 'Trayectoria',
    timelineSubtitle: 'Pase el cursor sobre cada experiencia para ver los detalles',
    certsTitle: 'Certificaciones',
    hoverHint: 'ver más ↓',
    present: 'Presente',
  },

  // ─── Games page ───────────────────────────────────────────────────────────
  games: {
    metaDescription: "Los juegos más jugados de Leonardo Escuciato — datos en vivo desde Steam.",
    heroBadge: 'PLAYER ONE READY',
    heroTitleNeon: 'MIS',
    heroTitleRest: ' JUEGOS',
    heroSubtitle: 'Los últimos juegos en los que pasé horas en Steam.',
    recentHeading: '// JUGANDO RECIENTEMENTE',
    recentBadge: 'ÚLTIMAS 2 SEMANAS',
    topHeading: '// JUEGOS MÁS JUGADOS',
    topBadge: 'ALL TIME',
    emptyRecent: 'Ningún juego jugado en las últimas 2 semanas.',
    emptyTop: 'No se encontraron datos de biblioteca en Steam.',
    activeLabel: 'Jugado recientemente',
    activeBadge: 'ACTIVO',
    weeksLabel: 'en las últimas 2 semanas',
    totalLabel: 'en total',
    recentLabel: 'recientes',
    coverAlt: 'Portada de',
  },

  // ─── Blog listing ─────────────────────────────────────────────────────────
  blog: {
    metaDescription: 'Reflexiones sobre transformación ágil, herramientas Atlassian, liderazgo de equipos y tecnología.',
    pageTitle: 'Blog',
    subtitle: 'Reflexiones sobre transformación ágil, herramientas Atlassian, liderazgo de equipos y tecnología.',
    emptyTitle: 'Aún sin publicaciones',
    emptyText: 'Vuelve pronto — el contenido está en camino.',
    readMore: 'Leer más',
    publishedOn: 'Publicado el',
    by: 'por',
  },

  // ─── Blog post ────────────────────────────────────────────────────────────
  blogPost: {
    backToBlog: 'Volver al Blog',
    by: 'por',
  },

  // ─── Login ────────────────────────────────────────────────────────────────
  login: {
    title: 'Acceso Admin',
    subtitle: 'Ingresa tu contraseña para continuar.',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Ingresa la contraseña admin',
    submitButton: 'Ingresar',
    errorMessage: 'Contraseña incorrecta. Inténtalo de nuevo.',
  },

  // ─── Sobre o Site ─────────────────────────────────────────────────────────
  sobreSite: {
    pageTitle: 'Acerca del Sitio',
    metaDescription: 'Cómo se construyó este sitio: stack, arquitectura, despliegue automatizado y guía para replicarlo desde cero.',
    heroBadge: 'Documentación Técnica',
    heroTitle: 'Acerca del Sitio',
    heroDesc: 'Cómo se construyó este sitio — stack, arquitectura, despliegue automatizado y una guía completa para que cualquiera pueda replicar esta estructura desde cero.',
    heroCollabNote: 'Desarrollado en colaboración con',
    heroCollabUsing: 'usando',
    heroCollabSuffix: '— una CLI para desarrollo asistido por IA.',
    sidebarAriaLabel: 'Navegación de la documentación',
    sidebarLabel: 'En esta página',
    nav: {
      overview: '1. Descripción General',
      stack: '2. Stack de Tecnologías',
      architecture: '3. Arquitectura',
      local: '4. Ejecutar Localmente',
      deploy: '5. Despliegue',
      seguranca: '6. Seguridad',
      agents: '7. Agentes Claude Code',
      guide: '8. Guía desde Cero',
      ai: '10. Usando IA',
      i18n: '9. Internacionalización',
    },
    sections: {
      visaoGeral: {
        title: 'Visión General',
        desc1: 'Este es un sitio personal moderno con <strong>Server-Side Rendering (SSR)</strong> construido con <strong>Astro</strong>. Va más allá de una simple página estática: incluye un blog con editor de texto enriquecido, un área de juegos integrada con la Steam API en tiempo real, y un sistema de despliegue completamente automatizado mediante Git hooks.',
        desc2: 'Todo el desarrollo se realizó en colaboración con Claude (Anthropic) usando <strong>Claude Code</strong> — una interfaz de línea de comandos que permite el desarrollo asistido por IA directamente en la terminal, con acceso al sistema de archivos, Git y el servidor.',
        desc3: 'El proyecto utiliza un conjunto de <strong>agentes especializados</strong> que automatizan tareas de frontend, infraestructura, calidad y seguridad — todos coordinados por lenguaje natural.',
        featureBlog: 'Blog con Editor Rico',
        featureBlogDesc: 'TipTap + SQLite, área admin protegida por JWT',
        featureGames: 'Juegos en Vivo',
        featureGamesDesc: 'Steam API con datos de juegos en tiempo real',
        featureDeploy: 'Despliegue Automatizado',
        featureDeployDesc: 'git push → build → restart en segundos',
        featureTls: 'TLS Automático',
        featureTlsDesc: "Traefik + Let's Encrypt sin configuración manual",
      },
      stack: {
        title: 'Stack de Tecnologías',
        subtitleApp: 'Aplicación',
        subtitleInfra: 'Infraestructura',
        subtitleDev: 'Desarrollo',
        colTech: 'Tecnología',
        colVersion: 'Versión',
        colRole: 'Función',
        colTool: 'Herramienta',
        whyBtn: '¿Por qué? ↓',
      },
      arquitetura: {
        title: 'Arquitectura',
        desc: 'El tráfico atraviesa cuatro capas antes de llegar a la aplicación. Cada capa tiene una responsabilidad única y bien definida.',
        diagramAriaLabel: 'Diagrama de arquitectura del sitio',
        visitor: 'Visitante',
        whyTitle: '¿Por qué cada capa?',
        whyTraefik: 'gestiona TLS y certificados Let\'s Encrypt automáticamente. Sin él, renovar HTTPS sería un proceso manual y propenso a errores.',
        whyNginx: 'actúa como buffer y proxy entre el mundo externo y el proceso Node.js. Permite configurar headers, caché y logs de forma independiente a la aplicación.',
        whyPm2: 'garantiza que el proceso Node.js se reinicie automáticamente tras fallos o reinicios del servidor.',
        whyAstro: 'renderiza HTML en el servidor, garantizando buen rendimiento, SEO correcto y soporte para lógica dinámica (base de datos, autenticación).',
      },
      local: {
        title: 'Ejecutar Localmente',
        prereq: '<strong>Requisitos previos:</strong> Node.js 18+, npm, Git.',
        cloneTitle: 'Clonar e instalar',
        envTitle: 'Variables de entorno',
        envDesc: 'Crea un archivo <code class="inline-code">.env</code> en la raíz del proyecto con las siguientes variables:',
        calloutSteam: 'Las variables <code class="inline-code">STEAM_API_KEY</code> y <code class="inline-code">STEAM_ID</code> son opcionales. Sin ellas, la página de Juegos mostrará un estado vacío pero el resto del sitio funcionará normalmente.',
      },
      deploy: {
        title: 'Despliegue',
        desc: 'El despliegue está totalmente automatizado mediante un <strong>Git hook</strong> en el servidor. Basta con hacer push al remote de producción.',
        flowTitle: 'Flujo de despliegue',
        autoTitle: 'Qué ocurre automáticamente en el servidor',
        autoDesc: 'El hook <code class="inline-code">post-receive</code> se ejecuta en secuencia:',
        step1Title: 'Checkout del código',
        step1Desc: 'El código se extrae del repositorio bare a <code class="inline-code">/root/WebSite/source</code>',
        step2Desc: 'Instala dependencias de forma determinista desde <code class="inline-code">package-lock.json</code>',
        step3Desc: 'Genera el bundle SSR optimizado para producción',
        step4Desc: 'Reinicia el proceso Node.js con cero downtime percibido',
        calloutWarning: 'El archivo <code class="inline-code">.env</code> en el servidor <strong>debe existir antes del primer build</strong>. Si añades nuevas variables al proyecto, es necesario actualizarlas en el servidor y hacer un nuevo despliegue.',
        persistenceTitle: 'Persistencia tras reinicio',
        persistenceDesc: 'El proceso Node.js es gestionado por <strong>PM2</strong> mediante un archivo <code class="inline-code">ecosystem.config.cjs</code> que fuerza <code class="inline-code">HOST=0.0.0.0</code>. El servicio <code class="inline-code">pm2-root.service</code> está registrado en <strong>systemd</strong>, garantizando que PM2 — y con él el sitio — arranque automáticamente tras cualquier reinicio del servidor. Los contenedores Docker (Nginx, Traefik, n8n) también usan la política <code class="inline-code">restart=always</code>.',
      },
      seguranca: {
        title: '6. Seguridad',
        intro: 'El área administrativa está protegida por una capa de autenticación JWT. A continuación se detallan las prácticas de seguridad adoptadas.',
        item1Title: 'Cookies de Sesión Seguras',
        item1Desc: 'Las cookies de autenticación usan el atributo <code>Secure</code>, garantizando que solo se transmitan en conexiones HTTPS.',
        item2Title: 'Prevención de XSS',
        item2Desc: 'El contenido de los posts del blog pasa por sanitización con lista de permisos (allowlist) antes de renderizarse, bloqueando scripts maliciosos.',
        item3Title: 'Respuestas de Error Genéricas',
        item3Desc: 'Las respuestas de error son intencionalmente genéricas para no exponer detalles internos del sistema.',
        item4Title: 'Rate Limiting en el Login',
        item4Desc: 'El endpoint de inicio de sesión tiene limitación de intentos para dificultar ataques de fuerza bruta.',
        item5Title: 'Expiración de Sesión',
        item5Desc: 'Las sesiones expiran después de un período de tiempo limitado, reduciendo la ventana de exposición ante un token comprometido.',
        item6Title: 'Invalidación de Token al Salir',
        item6Desc: 'Los tokens se invalidan explícitamente al cerrar sesión, impidiendo su reutilización incluso si fueron capturados.',
        item7Title: 'Comparación en Tiempo Constante',
        item7Desc: 'La verificación de contraseña usa comparación en tiempo constante para prevenir ataques de temporización.',
        item8Title: 'Protección contra Redirección Abierta',
        item8Desc: 'Los parámetros de redirección son validados para evitar que un atacante redirija usuarios a dominios externos.',
      },
      agentes: {
        title: 'Agentes Claude Code',
        desc: 'Este proyecto usa <strong>Claude Code</strong> con un sistema de agentes especializados definidos en <code class="inline-code">.claude/agents/</code>. Cada agente tiene un dominio de responsabilidad claro, y todos son coordinados por lenguaje natural a través del <em>site-orchestrator</em>.',
        badgeCoord: 'Coordinador',
        descOrchestrator: 'Interpreta solicitudes en lenguaje natural y delega a los agentes correctos. Punto de entrada para toda interacción con el proyecto.',
        badgeFrontend: 'Frontend',
        descWebDev: 'Páginas Astro, componentes React, estilos, configuraciones de build, commits y push a producción.',
        badgeInfra: 'Infra',
        descDevops: 'Nginx, Docker, PM2, pipeline de despliegue, diagnósticos del servidor vía SSH.',
        badgeQa: 'QA',
        descQa: 'Inspecciona el sitio en busca de errores visuales, funcionales y regresiones tras despliegues.',
        badgeSec: 'Seguridad',
        descSec: 'Audita el repositorio en busca de credenciales expuestas, datos sensibles y vulnerabilidades.',
        callout: 'Claude Code no reemplaza al desarrollador — amplifica la capacidad de ejecución. Las decisiones de arquitectura, la revisión de código y la validación final siempre quedan en manos del humano.',
      },
      guia: {
        title: 'Guía: Construye un Sitio Igual desde Cero',
        desc: 'Paso a paso para replicar esta arquitectura completa en cualquier VPS. Los marcadores de posición <code class="inline-code">TU_SERVIDOR</code>, <code class="inline-code">TU_DOMINIO</code> y <code class="inline-code">misitio</code> deben reemplazarse con tus valores reales.',
        diagramAriaLabel: 'Diagrama del flujo de despliegue',
        diagramDev: 'DESARROLLADOR',
        diagramServer: 'SERVIDOR VPS',
        diagramVisitor: 'VISITANTE',
        step71Title: 'Preparar el Servidor VPS',
        step71CodeTitle: 'Servidor — instalar Node.js y PM2',
        step72Title: 'Configurar el Repositorio Git Bare',
        step72CodeTitle: 'Servidor — crear repositorio bare',
        step73Title: 'Crear el Hook de Despliegue',
        step73CodeTitle: 'Servidor — crear hook post-receive',
        step73FileContent: 'Contenido del archivo:',
        step74Title: 'Configurar Nginx + Traefik con Docker',
        step74NginxDesc: 'Crea el archivo de configuración de Nginx:',
        step74DockerDesc: 'Crea el Docker Compose:',
        step74UpTitle: 'Levantar el contenedor',
        step75Title: 'Crear el Proyecto Astro',
        step75CodeTitle: 'Local — crear proyecto e instalar dependencias',
        step76Title: 'Configurar Remote y Hacer el Primer Despliegue',
        step76CodeTitle: 'Local + Servidor — primer despliegue',
        step76Callout: 'Tras el push, el hook se ejecuta automáticamente. En menos de un minuto tu sitio estará disponible en <code class="inline-code">https://TU_DOMINIO</code> con TLS configurado.',
      },
      usandoAI: {
        title: 'Usando IA',
        desc1: 'Todo este sitio fue construido usando <strong>Claude Code</strong> — una CLI que permite a un modelo de IA leer archivos, escribir código, acceder al servidor vía SSH y gestionar el ciclo completo de desarrollo. El proceso humano fue casi enteramente de <em>dirección</em>: describir lo que se quería, revisar el resultado y aprobar o pedir ajustes.',
        desc2: 'Con los dos prompts a continuación, cualquiera puede replicar este proyecto completo — desde cero hasta el sitio en línea — con como máximo <strong>1 comando manual</strong>.',
        prereqTitle: 'Antes de comenzar — lo que necesitas tener',
        prereq1: 'Claude Code instalado',
        prereq1Detail: ' — <code class="inline-code">npm install -g @anthropic-ai/claude-code</code>',
        prereq2: 'Node.js 20+ local',
        prereq2Detail: ' — para ejecutar el proyecto durante el desarrollo',
        prereq3: 'VPS con Ubuntu 24.04',
        prereq3Detail: ' — Docker instalado, Traefik en ejecución con un wildcard/dominio configurado',
        prereq4: 'Acceso root al servidor vía SSH',
        prereq4Detail: ' — el agente necesitará ejecutar comandos en el servidor',
        prereq5: 'Clave de Steam API',
        prereq5Detail: ' — opcional, solo si quieres la integración con Steam en la página de Juegos',
        gatherTitle: 'Ten a mano antes de comenzar:',
        gatherItems: [
          'IP de tu servidor y contraseña root',
          'Dominio o subdominio que apunta al servidor',
          'Tu currículum / experiencias profesionales (texto o PDF)',
          'Una contraseña fuerte para el admin del blog (combina mayúsculas, minúsculas, números y símbolos) y un secreto JWT (cadena aleatoria de mínimo 32 caracteres)',
          'Steam ID o vanity URL (opcional)',
        ],
        prompt1Badge: 'Prompt 1 de 2',
        prompt1Title: 'Construir el proyecto + configurar el servidor',
        prompt1Desc: 'Pega este prompt en Claude Code desde una carpeta vacía en tu computadora. El agente creará el proyecto completo localmente <em>y</em> configurará el servidor — al final mostrará la clave SSH pública que debe ser autorizada en el servidor.',
        prompt1CodeTitle: 'Claude Code — Prompt 1',
        prompt1Body: `Quiero construir un sitio web personal usando Astro SSR y publicarlo en un VPS.
Al final de este prompt tendrás:
1. El proyecto completo ejecutándose localmente
2. El servidor configurado con Nginx + PM2 + pipeline de despliegue via Git hook
3. La clave SSH pública mostrada en pantalla que necesita ser autorizada en el servidor

Información del proyecto:
- Mi nombre: [TU NOMBRE]
- Profesión actual: [TU PROFESIÓN]
- Ciudad: [TU CIUDAD]
- Hobbies: [HOBBIES]
- Experiencias profesionales: [PEGA AQUÍ O INDICA LA RUTA DE TU CV]

Información del servidor:
- IP: [IP_DEL_SERVIDOR]
- Usuario: root
- Dominio/host: [TU_DOMINIO]
- Traefik ya está ejecutándose en el servidor con Let's Encrypt configurado

Stack deseado (no modificar):
- Astro SSR con @astrojs/node adapter (standalone)
- React para componentes interactivos
- TipTap para el editor del blog
- SQLite (better-sqlite3) para los posts
- JWT (librería jose) para autenticación del admin
- PM2 para gestionar el proceso Node.js
- Nginx (Docker) como proxy inverso hacia el puerto 4321
- sanitize-html para sanitización del contenido del blog

Páginas que debe tener el sitio:
1. Inicio — presentación personal con hobbies
2. Profesional — línea de tiempo de carrera con tooltip al pasar el cursor
3. Blog — listado de posts + editor admin con TipTap (protegido por JWT)
4. Games — integración opcional con Steam API (la sección puede quedar vacía por ahora)
5. Acerca de — documentación técnica del proyecto

Requisitos de seguridad obligatorios (aplicar todos):
- Rate limiting en el endpoint de login para dificultar ataques de fuerza bruta
- Invalidación de token JWT al cerrar sesión (revocar en el servidor, no solo borrar la cookie)
- Comparación de contraseña en tiempo constante (crypto.timingSafeEqual) para prevenir timing attacks
- Cookie de sesión con flag Secure en conexiones HTTPS
- Sanitización del HTML del blog con allowlist via sanitize-html antes de renderizar
- Validación de parámetros de redirección para prevenir open redirect
- Respuestas de error genéricas para no exponer detalles internos del sistema
- Sesión con tiempo de expiración limitado

Tarea de los agentes:
- web-dev-craftsman: crear el proyecto Astro completo localmente con el stack anterior, aplicando todos los requisitos de seguridad
- vps-devops-manager: configurar el servidor (repositorio bare + hook de despliegue + Nginx Docker + PM2)
- security-auditor: verificar el código generado antes del primer despliegue

Al finalizar:
- Mostrar el contenido del archivo ~/.ssh/id_ed25519.pub (clave SSH pública)
- Indicar qué se necesita hacer antes del Prompt 2`,
        manualBadge: 'Paso Manual',
        manualTitle: 'Autorizar la clave SSH en el servidor',
        manualDesc: 'Este es el único paso manual. Claude Code no puede autorizarse en el servidor sin que ejecutes este comando una vez. Reemplaza con la clave mostrada en el Prompt 1.',
        manualCodeTitle: 'Ejecutar en el servidor (vía SSH)',
        manualComment1: '# Conectarse al servidor',
        manualComment2: '# Agregar la clave SSH pública de Claude Code',
        manualComment3: '# Salir del servidor',
        prompt2Badge: 'Prompt 2 de 2',
        prompt2Title: 'Crear .env + despliegue + verificación',
        prompt2Desc: 'Tras autorizar la clave SSH, ejecuta este segundo prompt en la misma sesión de Claude Code (o una nueva, dentro de la carpeta del proyecto). El agente creará el archivo <code class="inline-code">.env</code> en el servidor, hará el primer despliegue y verificará que el sitio está en línea.',
        prompt2CodeTitle: 'Claude Code — Prompt 2',
        prompt2Body: `La clave SSH ya fue autorizada en el servidor. Ahora ejecuta los pasos finales:

1. vps-devops-manager: crear el archivo .env en el servidor en /root/MiSitio/source/.env con:
   ADMIN_PASSWORD=[CONTRASEÑA FUERTE — ej: MiP@ssw0rd2025! — usa mayúsculas, minúsculas, números y símbolos]
   JWT_SECRET=[CADENA ALEATORIA MIN 32 CHARS — genera con: openssl rand -base64 48]
   HOST=0.0.0.0
   PORT=4321
   (Si quieres Steam: STEAM_API_KEY=[TU_CLAVE_STEAM] y STEAM_ID=[TU_STEAM_ID])

2. web-dev-craftsman: agregar el remote de producción y hacer el primer despliegue:
   git remote add production root@[IP_DEL_SERVIDOR]:/root/repos/misitio.git
   git push production main

3. vps-devops-manager: verificar que PM2 inició correctamente tras el despliegue

4. security-auditor: verificar que no hay credenciales expuestas en el repositorio
   y que el flujo de autenticación en producción funciona correctamente

5. qa-bug-hunter: acceder a [TU_DOMINIO] y verificar que el sitio funciona —
   revisar inicio, blog, profesional y games

Al finalizar, mostrar la URL pública del sitio.`,
        finalCallout: 'Listo — sitio en línea con despliegue automatizado. A partir de ahí, cualquier cambio se hace describiendo en lenguaje natural y confirmando con <code class="inline-code">git push production main</code>.',
      },
      i18n: {
        title: 'Internacionalización (i18n)',
        desc: 'El sitio admite tres idiomas — <strong>Português (PT)</strong>, <strong>English (EN)</strong> y <strong>Español (ES)</strong> — sin cambiar las URLs. El cambio de idioma se realiza mediante la cookie <code class="inline-code">lang</code>, leída en el SSR en cada renderizado.',
        archTitle: 'Arquitectura',
        archItem1: 'Diccionarios de traducción en TypeScript, tipados a partir del archivo PT (fuente de verdad).',
        archItem2: 'Helpers <code class="inline-code">useTranslations(lang)</code> y <code class="inline-code">getLang(cookies)</code> para lectura segura de la cookie.',
        archItem3: 'Endpoint POST que establece la cookie <code class="inline-code">lang</code> (maxAge: 1 año) y redirige de vuelta via <code class="inline-code">Referer</code>.',
        archItem4: 'Tres botones <code class="inline-code">PT | EN | ES</code> integrados en el Header, con el idioma activo resaltado.',
        howTitle: 'Cómo funciona en cada página SSR',
        howCodeTitle: 'Ejemplo de uso en una página',
        howComment: '// Usar en las plantillas:',
        callout: 'Las páginas de administración (<code class="inline-code">/blog/admin</code>, <code class="inline-code">/blog/new</code>) permanecen en portugués — son áreas internas sin necesidad de internacionalización. Las APIs tampoco fueron modificadas.',
      },
    },
  },

  // ─── Professional experiences ─────────────────────────────────────────────
  experiences: [
    {
      role: 'Sr. Atlassian Consultant',
      company: 'Modus Create',
      period: 'Ene 2022 – Presente',
      tooltip: 'Implementación de configuraciones de gestión de proyectos con herramientas Atlassian para diferentes empresas. Gran experiencia con Jira Automation, Advanced Roadmaps y adaptación de procesos ágiles a distintos contextos organizacionales.',
    },
    {
      role: 'Squad Leader',
      company: 'Modus Create',
      period: 'Jun 2021 – Feb 2022',
      tooltip: 'Liderazgo de ceremonias ágiles, organización de Jira para informes y métricas, trabajo en formato Kanban con foco en calidad, distribución de tareas y comunicación con el cliente.',
    },
    {
      role: 'Transformation Lead',
      company: 'Zup Innovation',
      period: 'Oct 2019 – Jun 2021',
      tooltip: 'Gestión de la salud financiera del proyecto, liderazgo de rituales ágiles, aplicación de la metodología SAFe, extracción de métricas mediante APIs de Jira y construcción de dashboards de calidad y predictibilidad.',
    },
    {
      role: 'Agile Coach & Jira Administrator',
      company: 'Softvaro',
      period: 'Sep 2018 – Oct 2019',
      tooltip: 'Mejora de la visibilidad del desarrollo de software a través de metodologías ágiles. Administración de Jira con estándares personalizados por cliente y extracción de datos vía APIs REST para métricas.',
    },
    {
      role: 'Scrum Master',
      company: 'CI&T',
      period: 'Sep 2015 – Ago 2018 (Europa)',
      tooltip: 'Liderazgo de equipos como Scrum Master, mejorando procesos y entrega a través de métricas como Velocidad y Productividad. Despliegue de MVP Mobile para una gran empresa de bebidas en Europa, República Dominicana y México.',
    },
  ],

  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    builtWith: 'Construido con',
  },
};
