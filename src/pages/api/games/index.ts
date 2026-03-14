/**
 * GET  /api/games  — list all games
 * POST /api/games  — create a new game entry (admin only)
 */

import type { APIRoute } from 'astro';
import { gamesDb } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

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

  try {
    const result = gamesDb.create({ title, platform, status, rating, review, cover_url });
    return new Response(JSON.stringify({ id: result.lastInsertRowid }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Database error';
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
