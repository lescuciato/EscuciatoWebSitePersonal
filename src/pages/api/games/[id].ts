/**
 * PUT    /api/games/[id]  — update a game entry (admin only)
 * DELETE /api/games/[id]  — delete a game entry (admin only)
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

export const PUT: APIRoute = async ({ request, params }) => {
  const session = await getSession(request);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid game ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const game = gamesDb.getById(id);
  if (!game) {
    return new Response(JSON.stringify({ message: 'Game not found' }), {
      status: 404,
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

  const title = body.title ?? game.title;
  const platform = body.platform ?? game.platform ?? '';
  const status = body.status ?? game.status;
  const rating = body.rating ?? game.rating;
  const review = body.review ?? game.review ?? '';
  const cover_url = body.cover_url ?? game.cover_url ?? '';

  if (!isValidUrl(cover_url)) {
    return new Response(JSON.stringify({ message: 'Invalid cover_url' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    gamesDb.update(id, { title, platform, status, rating, review, cover_url });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[API Error] PUT /api/games/[id]', err);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const session = await getSession(request);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: 'Invalid game ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  gamesDb.delete(id);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
