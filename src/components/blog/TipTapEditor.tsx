/**
 * TipTapEditor — React component for the blog post editor.
 * Uses TipTap with a custom toolbar: bold, italic, headings,
 * bullet/ordered lists, blockquote, code block, and links.
 *
 * Must be used with client:load in .astro files.
 */

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import { useState, useCallback } from 'react';

interface TipTapEditorProps {
  content?: string;
  onUpdate?: (html: string) => void;
}

// ─── Toolbar Button ────────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  active = false,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`toolbar-btn ${active ? 'active' : ''}`}
    >
      {children}
    </button>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const addLink = useCallback(() => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <div className="tiptap-toolbar" role="toolbar" aria-label="Text formatting">
      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        H3
      </ToolbarButton>

      <div className="toolbar-divider" />

      {/* Inline formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        title="Inline code"
      >
        {'</>'}
      </ToolbarButton>

      <div className="toolbar-divider" />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet list"
      >
        &#8226;&#8212;
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Ordered list"
      >
        1&#8212;
      </ToolbarButton>

      <div className="toolbar-divider" />

      {/* Block-level */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Blockquote"
      >
        &#10077;
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
        title="Code block"
      >
        {'{ }'}
      </ToolbarButton>

      <div className="toolbar-divider" />

      {/* Link */}
      <ToolbarButton
        onClick={addLink}
        active={editor.isActive('link')}
        title="Add link"
      >
        🔗
      </ToolbarButton>
      {editor.isActive('link') && (
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="Remove link"
        >
          🔗✕
        </ToolbarButton>
      )}
    </div>
  );
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

export default function TipTapEditor({ content = '', onUpdate }: TipTapEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // use dedicated CodeBlock extension
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer' },
      }),
      CodeBlock,
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
  });

  const handlePreview = () => {
    if (editor) {
      setPreviewHtml(editor.getHTML());
      setShowPreview(true);
    }
  };

  return (
    <div className="tiptap-wrapper">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="tiptap-content" />

      <div className="tiptap-actions">
        <button type="button" className="btn-preview" onClick={handlePreview}>
          Preview
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="preview-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Post preview"
          onClick={(e) => e.target === e.currentTarget && setShowPreview(false)}
        >
          <div className="preview-modal">
            <div className="preview-header">
              <h3>Preview</h3>
              <button
                type="button"
                className="preview-close"
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>
            <div
              className="preview-body prose"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      )}

      <style>{`
        .tiptap-wrapper {
          display: flex;
          flex-direction: column;
          border: 1px solid #2a2a3a;
          border-radius: 8px;
          overflow: hidden;
          background: #1a1a24;
        }

        .tiptap-toolbar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 2px;
          padding: 8px 12px;
          background: #0f0f13;
          border-bottom: 1px solid #2a2a3a;
        }

        .toolbar-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          height: 30px;
          padding: 0 6px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          color: #94a3b8;
          font-size: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer;
          transition: all 150ms ease;
        }

        .toolbar-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          color: #e2e8f0;
          border-color: rgba(99, 102, 241, 0.3);
        }

        .toolbar-btn.active {
          background: rgba(99, 102, 241, 0.2);
          color: #a78bfa;
          border-color: rgba(99, 102, 241, 0.4);
        }

        .toolbar-divider {
          width: 1px;
          height: 20px;
          background: #2a2a3a;
          margin: 0 4px;
        }

        .tiptap-content {
          padding: 20px;
          min-height: 320px;
          max-height: 600px;
          overflow-y: auto;
        }

        .tiptap-content:focus-within {
          outline: none;
        }

        /* ProseMirror content styling */
        .tiptap-content .ProseMirror {
          outline: none;
          color: #e2e8f0;
          font-size: 0.95rem;
          line-height: 1.7;
          min-height: 280px;
        }

        .tiptap-content .ProseMirror p { margin-bottom: 1rem; }
        .tiptap-content .ProseMirror h2 { font-size: 1.5rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: #e2e8f0; }
        .tiptap-content .ProseMirror h3 { font-size: 1.2rem; font-weight: 600; margin: 1.25rem 0 0.5rem; color: #e2e8f0; }
        .tiptap-content .ProseMirror strong { font-weight: 700; color: #f1f5f9; }
        .tiptap-content .ProseMirror em { font-style: italic; color: #cbd5e1; }
        .tiptap-content .ProseMirror code { font-family: 'JetBrains Mono', monospace; background: #0f0f13; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; color: #a78bfa; }
        .tiptap-content .ProseMirror pre { background: #0a0a10; border: 1px solid #2a2a3a; border-radius: 8px; padding: 16px; margin: 1rem 0; overflow-x: auto; }
        .tiptap-content .ProseMirror pre code { background: none; padding: 0; color: #94a3b8; font-size: 0.88rem; }
        .tiptap-content .ProseMirror blockquote { border-left: 3px solid #6366f1; padding-left: 1rem; margin: 1rem 0; color: #94a3b8; }
        .tiptap-content .ProseMirror ul { padding-left: 1.5rem; margin-bottom: 1rem; list-style: disc; }
        .tiptap-content .ProseMirror ol { padding-left: 1.5rem; margin-bottom: 1rem; list-style: decimal; }
        .tiptap-content .ProseMirror li { margin-bottom: 0.25rem; }
        .tiptap-content .ProseMirror a { color: #a78bfa; text-decoration: underline; }
        .tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #475569;
          pointer-events: none;
          height: 0;
        }

        .tiptap-actions {
          display: flex;
          justify-content: flex-end;
          padding: 10px 12px;
          background: #0f0f13;
          border-top: 1px solid #2a2a3a;
        }

        .btn-preview {
          padding: 6px 16px;
          background: transparent;
          border: 1px solid #2a2a3a;
          border-radius: 6px;
          color: #94a3b8;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 150ms ease;
        }

        .btn-preview:hover {
          border-color: #6366f1;
          color: #e2e8f0;
        }

        /* ─── Preview Modal ─── */
        .preview-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 32px 16px;
          overflow-y: auto;
        }

        .preview-modal {
          width: 100%;
          max-width: 760px;
          background: #1a1a24;
          border: 1px solid #2a2a3a;
          border-radius: 12px;
          overflow: hidden;
        }

        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a3a;
        }

        .preview-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
        }

        .preview-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 1rem;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: color 150ms ease;
        }

        .preview-close:hover {
          color: #e2e8f0;
        }

        .preview-body {
          padding: 24px 28px;
          color: #e2e8f0;
          font-size: 1rem;
          line-height: 1.75;
        }

        .preview-body h2 { font-size: 1.5rem; font-weight: 700; margin: 1.5rem 0 0.75rem; }
        .preview-body h3 { font-size: 1.2rem; font-weight: 600; margin: 1.25rem 0 0.5rem; }
        .preview-body p { margin-bottom: 1rem; }
        .preview-body strong { font-weight: 700; }
        .preview-body em { font-style: italic; }
        .preview-body code { font-family: monospace; background: #0f0f13; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; color: #a78bfa; }
        .preview-body pre { background: #0a0a10; border: 1px solid #2a2a3a; border-radius: 8px; padding: 16px; margin: 1rem 0; overflow-x: auto; }
        .preview-body blockquote { border-left: 3px solid #6366f1; padding-left: 1rem; margin: 1rem 0; color: #94a3b8; }
        .preview-body ul { padding-left: 1.5rem; margin-bottom: 1rem; list-style: disc; }
        .preview-body ol { padding-left: 1.5rem; margin-bottom: 1rem; list-style: decimal; }
        .preview-body a { color: #a78bfa; }
      `}</style>
    </div>
  );
}
