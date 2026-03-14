/**
 * POST /api/set-lang
 * Sets the `lang` cookie and redirects back to the referring page (or /).
 *
 * Accepts a form POST with field `lang` (values: pt | en | es).
 * Can also accept `lang` as a query parameter for simpler links.
 */
import type { APIRoute } from 'astro';
import { SUPPORTED_LANGS, type Lang } from '../../i18n/index';

/**
 * Validate the Referer redirect target to prevent open redirects.
 * Accepts only relative paths starting with exactly one `/`.
 */
function safeReferer(referer: string): string {
  try {
    const url = new URL(referer);
    // Same-origin: return only the path+search+hash
    if (url.origin === 'null') return '/';
    return url.pathname + url.search + url.hash;
  } catch {
    // Not an absolute URL — treat as relative path
    if (!referer.startsWith('/') || referer.startsWith('//')) return '/';
    return referer;
  }
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  let lang: string | null = null;

  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();
    lang = formData.get('lang')?.toString() ?? null;
  } else {
    // Fallback: try query param
    const url = new URL(request.url);
    lang = url.searchParams.get('lang');
  }

  if (!lang || !SUPPORTED_LANGS.includes(lang as Lang)) {
    return new Response('Invalid language', { status: 400 });
  }

  // Set cookie for 1 year
  cookies.set('lang', lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: 'lax',
  });

  // Redirect back to referer or home — validate to prevent open redirect
  const referer = request.headers.get('referer') ?? '/';
  return redirect(safeReferer(referer), 302);
};

// Also support GET with query param (useful for direct links)
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang');

  if (!lang || !SUPPORTED_LANGS.includes(lang as Lang)) {
    return redirect('/', 302);
  }

  cookies.set('lang', lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: 'lax',
  });

  const referer = request.headers.get('referer') ?? '/';
  return redirect(safeReferer(referer), 302);
};
