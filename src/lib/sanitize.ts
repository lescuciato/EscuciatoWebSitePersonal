/**
 * HTML sanitization for blog post content rendered via set:html.
 * Uses sanitize-html to strip any tags/attributes not in the allowlist,
 * preventing XSS from user-supplied or TipTap-generated HTML.
 */

import sanitizeHtml from 'sanitize-html';

export function sanitizePostContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'h2', 'h3', 'p', 'strong', 'em', 'code', 'pre',
      'ul', 'ol', 'li', 'blockquote', 'a', 'br',
    ],
    allowedAttributes: {
      'a': ['href', 'rel', 'target'],
      'code': ['class'],
      'pre': ['class'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    transformTags: {
      'a': (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    },
  });
}
