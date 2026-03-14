/**
 * Database module — SQLite via better-sqlite3
 * Database file: /data/blog.db (relative to project root)
 * Tables are created on first import (CREATE TABLE IF NOT EXISTS).
 */

import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Resolve path to /data/blog.db relative to project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..', '..');
const dataDir = join(projectRoot, 'data');
const dbPath = join(dataDir, 'blog.db');

// Ensure the data directory exists at runtime
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Open (or create) the database
const db = new Database(dbPath);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');

// ─── Schema ──────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    slug       TEXT    UNIQUE NOT NULL,
    title      TEXT    NOT NULL,
    excerpt    TEXT,
    content    TEXT    NOT NULL,
    tags       TEXT,
    published  INTEGER DEFAULT 0,
    created_at TEXT    DEFAULT (datetime('now')),
    updated_at TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS games (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT    NOT NULL,
    platform   TEXT,
    status     TEXT    DEFAULT 'playing',
    rating     INTEGER DEFAULT 0,
    review     TEXT,
    cover_url  TEXT,
    created_at TEXT    DEFAULT (datetime('now'))
  );
`);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  tags: string | null;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: number;
  title: string;
  platform: string | null;
  status: 'playing' | 'finished' | 'queued' | 'paused';
  rating: number;
  review: string | null;
  cover_url: string | null;
  created_at: string;
}

// ─── Post queries ─────────────────────────────────────────────────────────────

export const postsDb = {
  getAll: () =>
    db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all() as Post[],

  getPublished: () =>
    db
      .prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC')
      .all() as Post[],

  getBySlug: (slug: string) =>
    db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug) as Post | undefined,

  getById: (id: number) =>
    db.prepare('SELECT * FROM posts WHERE id = ?').get(id) as Post | undefined,

  create: (data: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string;
    published: number;
  }) =>
    db
      .prepare(
        `INSERT INTO posts (slug, title, excerpt, content, tags, published)
         VALUES (@slug, @title, @excerpt, @content, @tags, @published)`
      )
      .run(data),

  update: (id: number, data: {
    title: string;
    excerpt: string;
    content: string;
    tags: string;
    published: number;
    slug: string;
  }) =>
    db
      .prepare(
        `UPDATE posts
         SET title = @title, excerpt = @excerpt, content = @content,
             tags = @tags, published = @published, slug = @slug,
             updated_at = datetime('now')
         WHERE id = @id`
      )
      .run({ ...data, id }),

  togglePublished: (id: number, published: number) =>
    db
      .prepare("UPDATE posts SET published = ?, updated_at = datetime('now') WHERE id = ?")
      .run(published, id),

  delete: (id: number) =>
    db.prepare('DELETE FROM posts WHERE id = ?').run(id),
};

// ─── Games queries ────────────────────────────────────────────────────────────

export const gamesDb = {
  getAll: () =>
    db.prepare('SELECT * FROM games ORDER BY created_at DESC').all() as Game[],

  getById: (id: number) =>
    db.prepare('SELECT * FROM games WHERE id = ?').get(id) as Game | undefined,

  create: (data: {
    title: string;
    platform: string;
    status: string;
    rating: number;
    review: string;
    cover_url: string;
  }) =>
    db
      .prepare(
        `INSERT INTO games (title, platform, status, rating, review, cover_url)
         VALUES (@title, @platform, @status, @rating, @review, @cover_url)`
      )
      .run(data),

  update: (id: number, data: {
    title: string;
    platform: string;
    status: string;
    rating: number;
    review: string;
    cover_url: string;
  }) =>
    db
      .prepare(
        `UPDATE games
         SET title = @title, platform = @platform, status = @status,
             rating = @rating, review = @review, cover_url = @cover_url
         WHERE id = @id`
      )
      .run({ ...data, id }),

  delete: (id: number) =>
    db.prepare('DELETE FROM games WHERE id = ?').run(id),
};

export default db;
