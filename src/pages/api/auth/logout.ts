/**
 * GET /api/auth/logout
 * Clears the session cookie and redirects to home.
 */

import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../lib/auth';

export const GET: APIRoute = () => {
  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': clearSessionCookie(),
      Location: '/',
    },
  });
};
