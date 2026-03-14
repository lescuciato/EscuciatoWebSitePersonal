/**
 * GET /api/auth/logout
 * Revokes the current session token in the database, clears the cookie,
 * and redirects to home.
 */

import type { APIRoute } from 'astro';
import {
  clearSessionCookie,
  extractTokenFromCookies,
  verifySessionToken,
  revokeToken,
} from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
  // Revoke the current JWT so it cannot be reused even if someone has a copy
  const cookieHeader = request.headers.get('cookie');
  const token = extractTokenFromCookies(cookieHeader);

  if (token) {
    const payload = await verifySessionToken(token);
    if (payload?.jti && payload?.exp) {
      revokeToken(payload.jti, payload.exp);
    }
  }

  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': clearSessionCookie(),
      Location: '/',
    },
  });
};
