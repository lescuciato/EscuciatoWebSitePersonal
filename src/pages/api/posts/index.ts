/**
 * GET  /api/posts  — list all posts (admin only)
 * POST /api/posts  — create a new post (admin only)
 */

import type { APIRoute } from 'astro';
import { postsDb } from '../../../lib/db';
import { getSession } from '../../../lib/auth';
import { sanitizePostContent } from '../../../lib/sanitize';

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const timestamp = Date.now().toString(36);
  return `${base}-${timestamp}`;
}

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const posts = postsDb.getAll();
  return new Response(JSON.stringify(posts), {
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
    excerpt?: string;
    content?: string;
    tags?: string;
    published?: number;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { title, excerpt = '', content, tags = '', published = 0 } = body;

  if (!title || !content) {
    return new Response(JSON.stringify({ message: 'title and content are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slug = generateSlug(title);
  const safeContent = sanitizePostContent(content);

  try {
    postsDb.create({ slug, title, excerpt, content: safeContent, tags, published });
    return new Response(JSON.stringify({ slug }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[API Error] POST /api/posts', err);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
