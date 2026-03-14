/**
 * Auth module — JWT-based session via httpOnly cookie
 * Uses `jose` for JWT signing/verification.
 * ADMIN_PASSWORD and JWT_SECRET come from environment variables.
 */

import { SignJWT, jwtVerify } from 'jose';
import { timingSafeEqual, createHash, randomUUID } from 'crypto';
import db from './db';

const jwtSecretValue = import.meta.env.JWT_SECRET;
if (!jwtSecretValue) throw new Error('JWT_SECRET environment variable must be set');
const JWT_SECRET = new TextEncoder().encode(jwtSecretValue);
const COOKIE_NAME = 'session';
const SESSION_DURATION = '8h';
const SESSION_MS = 8 * 60 * 60 * 1000;

// ─── Revoked tokens table ─────────────────────────────────────────────────────

// Create revoked_tokens table if it does not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS revoked_tokens (
    jti        TEXT    PRIMARY KEY,
    revoked_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  )
`);

// Prune tokens that have already expired — they can never be used again anyway
db.exec(`DELETE FROM revoked_tokens WHERE expires_at < unixepoch()`);

/**
 * Mark a JWT ID as revoked until its expiry timestamp (Unix seconds).
 */
export function revokeToken(jti: string, expiresAt: number): void {
  db.prepare(
    `INSERT OR IGNORE INTO revoked_tokens (jti, revoked_at, expires_at)
     VALUES (?, unixepoch(), ?)`
  ).run(jti, expiresAt);
}

/**
 * Return true if the given JWT ID has been explicitly revoked.
 */
export function isTokenRevoked(jti: string): boolean {
  const row = db.prepare('SELECT 1 FROM revoked_tokens WHERE jti = ?').get(jti);
  return row !== undefined;
}

// ─── Token helpers ────────────────────────────────────────────────────────────

/**
 * Generate a signed JWT for an authenticated admin session.
 * Includes a unique `jti` (JWT ID) to support server-side revocation.
 */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .setJti(randomUUID())
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT token and check it has not been revoked.
 * Returns the payload (including jti and exp) on success, null on failure.
 */
export async function verifySessionToken(
  token: string
): Promise<{ role: string; jti?: string; exp?: number } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const jti = payload.jti;
    if (jti && isTokenRevoked(jti)) return null;
    return payload as { role: string; jti?: string; exp?: number };
  } catch {
    return null;
  }
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

/**
 * Build the Set-Cookie header string for the session cookie.
 * Adds the Secure flag in production environments.
 */
export function buildSessionCookie(token: string): string {
  const expires = new Date(Date.now() + SESSION_MS).toUTCString();
  const isProduction = import.meta.env.PROD;
  const secureFlag = isProduction ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax${secureFlag}; Expires=${expires}`;
}

/**
 * Build the Set-Cookie header that clears the session cookie.
 */
export function clearSessionCookie(): string {
  const isProduction = import.meta.env.PROD;
  const secureFlag = isProduction ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax${secureFlag}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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
): Promise<{ role: string; jti?: string; exp?: number } | null> {
  const cookieHeader = request.headers.get('cookie');
  const token = extractTokenFromCookies(cookieHeader);
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Verify the plain-text password against the ADMIN_PASSWORD env var.
 * Uses timing-safe comparison via SHA-256 hashes to prevent timing attacks.
 */
export function checkPassword(password: string): boolean {
  const adminPassword = import.meta.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const a = Buffer.from(createHash('sha256').update(password).digest('hex'));
  const b = Buffer.from(createHash('sha256').update(adminPassword).digest('hex'));
  return timingSafeEqual(a, b);
}

export { COOKIE_NAME };
