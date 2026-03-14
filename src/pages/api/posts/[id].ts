/**
 * PUT    /api/posts/[id]  — update a post (admin only)
 * DELETE /api/posts/[id]  — delete a post (admin only)
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
    return new Response(JSON.stringify({ message: 'Invalid post ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const post = postsDb.getById(id);
  if (!post) {
    return new Response(JSON.stringify({ message: 'Post not found' }), {
      status: 404,
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

  // If only toggling published status
  if (typeof body.published !== 'undefined' && !body.title && !body.content) {
    postsDb.togglePublished(id, body.published);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const title = body.title ?? post.title;
  const rawContent = body.content ?? post.content;
  const content = sanitizePostContent(rawContent);
  const excerpt = body.excerpt ?? post.excerpt ?? '';
  const tags = body.tags ?? post.tags ?? '';
  const published = body.published ?? post.published;

  // Regenerate slug only if title changed
  const slug = title !== post.title ? generateSlug(title) : post.slug;

  try {
    postsDb.update(id, { title, excerpt, content, tags, published, slug });
    return new Response(JSON.stringify({ slug }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[API Error] PUT /api/posts/[id]', err);
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
    return new Response(JSON.stringify({ message: 'Invalid post ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  postsDb.delete(id);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
