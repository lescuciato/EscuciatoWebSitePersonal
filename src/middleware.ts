// Astro middleware — protects admin routes and mutation API endpoints.
// Protected page paths: /notas/new, /notas/:slug/edit, /notas/admin, /games/admin
// Protected API paths (non-GET): /api/posts, /api/games

import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/auth';

// Page routes that require authentication
const PROTECTED_PATTERNS = [
  /^\/notas\/new$/,
  /^\/notas\/admin$/,
  /^\/notas\/[^/]+\/edit$/,
  /^\/games\/admin$/,
];

// API route prefixes where mutating methods (non-GET) require authentication.
// Individual handlers also check auth, but this provides a centralised fallback.
const API_PROTECTED = ['/api/posts', '/api/games'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

  // ─── Protect API mutation endpoints ──────────────────────────────────────────
  if (
    API_PROTECTED.some((p) => pathname.startsWith(p)) &&
    context.request.method !== 'GET'
  ) {
    const session = await getSession(context.request);
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // ─── Protect admin page routes ────────────────────────────────────────────────
  const isProtected = PROTECTED_PATTERNS.some((pattern) => pattern.test(pathname));

  if (isProtected) {
    const session = await getSession(context.request);
    if (!session) {
      // Redirect unauthenticated users to the login page
      return context.redirect(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }

  return next();
});
