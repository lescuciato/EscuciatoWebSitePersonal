/**
 * Auth module — JWT-based session via httpOnly cookie
 * Uses `jose` for JWT signing/verification.
 * ADMIN_PASSWORD and JWT_SECRET come from environment variables.
 */

import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  import.meta.env.JWT_SECRET || 'fallback-dev-secret-change-in-production'
);
const COOKIE_NAME = 'session';
const SESSION_DURATION = '7d';

// ─── Token helpers ────────────────────────────────────────────────────────────

/**
 * Generate a signed JWT for an authenticated admin session.
 */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT token. Returns the payload on success, null on failure.
 */
export async function verifySessionToken(
  token: string
): Promise<{ role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { role: string };
  } catch {
    return null;
  }
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

/**
 * Build the Set-Cookie header string for the session cookie.
 */
export function buildSessionCookie(token: string): string {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`;
}

/**
 * Build the Set-Cookie header that clears the session cookie.
 */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * Extract the session token from a Cookie header string.
 */
export function extractTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

// ─── Request auth check ───────────────────────────────────────────────────────

/**
 * Check if an Astro request carries a valid admin session.
 * Returns the JWT payload on success, null otherwise.
 */
export async function getSession(
  request: Request
): Promise<{ role: string } | null> {
  const cookieHeader = request.headers.get('cookie');
  const token = extractTokenFromCookies(cookieHeader);
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Verify the plain-text password against the ADMIN_PASSWORD env var.
 */
export function checkPassword(password: string): boolean {
  const adminPassword = import.meta.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

export { COOKIE_NAME };
