/**
 * POST /api/auth/login
 * Validates the admin password and sets a JWT session cookie on success.
 */

import type { APIRoute } from 'astro';
import { checkPassword, createSessionToken, buildSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  let password: string;
  let next = '/blog/admin';

  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    password = body.password ?? '';
    next = body.next ?? next;
  } else {
    // Standard HTML form POST (application/x-www-form-urlencoded)
    const formData = await request.formData();
    password = (formData.get('password') as string) ?? '';
    next = (formData.get('next') as string) ?? next;
  }

  if (!checkPassword(password)) {
    // Redirect back to login with error flag
    return new Response(null, {
      status: 302,
      headers: { Location: '/login?error=1' },
    });
  }

  const token = await createSessionToken();
  const cookie = buildSessionCookie(token);

  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': cookie,
      Location: next,
    },
  });
};
