/**
 * POST /api/auth/login
 * Validates the admin password and sets a JWT session cookie on success.
 * Rate-limited to 5 attempts per IP per 15 minutes.
 * Validates the `next` redirect parameter to prevent open redirects.
 */

import type { APIRoute } from 'astro';
import { checkPassword, createSessionToken, buildSessionCookie } from '../../../lib/auth';
import { checkRateLimit, resetRateLimit } from '../../../lib/rateLimit';

/**
 * Validate the `next` redirect target.
 * Accepts only relative paths that start with exactly one `/`.
 */
function safeRedirect(next: string | null | undefined): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return '/blog/admin';
  }
  return next;
}

export const POST: APIRoute = async ({ request }) => {
  // ─── Rate limiting ──────────────────────────────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ message: 'Too many login attempts. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateCheck.retryAfter ?? 900),
        },
      }
    );
  }

  // ─── Parse request body ─────────────────────────────────────────────────────
  let password: string;
  let next: string | null | undefined;

  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    password = body.password ?? '';
    next = body.next;
  } else {
    // Standard HTML form POST (application/x-www-form-urlencoded)
    const formData = await request.formData();
    password = (formData.get('password') as string) ?? '';
    next = formData.get('next') as string | null;
  }

  // ─── Password check ─────────────────────────────────────────────────────────
  if (!checkPassword(password)) {
    // Redirect back to login with error flag — do NOT reset rate limit on failure
    return new Response(null, {
      status: 302,
      headers: { Location: '/login?error=1' },
    });
  }

  // Successful login — clear the rate limit entry for this IP
  resetRateLimit(ip);

  const token = await createSessionToken();
  const cookie = buildSessionCookie(token);
  const redirectTo = safeRedirect(next);

  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': cookie,
      Location: redirectTo,
    },
  });
};
