/**
 * GET  /api/games  — list all games
 * POST /api/games  — create a new game entry (admin only)
 */

import type { APIRoute } from 'astro';
import { gamesDb } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

/**
 * Validate that cover_url is either absent/empty or a valid http/https URL.
 */
function isValidUrl(url: string | null | undefined): boolean {
  if (!url) return true; // field is optional
  return /^https?:\/\//.test(url);
}

export const GET: APIRoute = ({ request: _request }) => {
  const games = gamesDb.getAll();
  return new Response(JSON.stringify(games), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: {
    title?: string;
    platform?: string;
    status?: string;
    rating?: number;
    review?: string;
    cover_url?: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { title, platform = '', status = 'queued', rating = 0, review = '', cover_url = '' } = body;

  if (!title) {
    return new Response(JSON.stringify({ message: 'title is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!isValidUrl(cover_url)) {
    return new Response(JSON.stringify({ message: 'Invalid cover_url' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = gamesDb.create({ title, platform, status, rating, review, cover_url });
    return new Response(JSON.stringify({ id: result.lastInsertRowid }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[API Error] POST /api/games', err);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
