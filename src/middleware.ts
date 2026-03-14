/**
 * Astro middleware — protects admin routes by checking for a valid session cookie.
 * Protected paths: /blog/new, /blog/*/edit, /blog/admin, /games/admin
 */

import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/auth';

// Routes that require authentication
const PROTECTED_PATTERNS = [
  /^\/blog\/new$/,
  /^\/blog\/admin$/,
  /^\/blog\/[^/]+\/edit$/,
  /^\/games\/admin$/,
];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);

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
