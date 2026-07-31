import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleImageUrl } from '@/lib/supabase/storage-url';

type TiptapNode = {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapNode[];
  marks?: { type: string; attrs?: Record<string, any> }[];
  text?: string;
};

export default function TiptapRenderer({ content }: { content: any }) {
  if (!content) return null;

  // Render text nodes with marks (bold, italic, link)
  const renderText = (node: TiptapNode, index: number) => {
    let element: React.ReactNode = node.text || '';

    if (node.marks) {
      // Apply marks from inside out
      for (const mark of node.marks) {
        if (mark.type === 'bold') {
          element = <strong key={`${index}-${mark.type}`}>{element}</strong>;
        } else if (mark.type === 'italic') {
          element = <em key={`${index}-${mark.type}`}>{element}</em>;
        } else if (mark.type === 'link') {
          element = (
            <a
              key={`${index}-${mark.type}`}
              href={mark.attrs?.href || '#'}
              target={mark.attrs?.target || '_blank'}
              rel={mark.attrs?.rel || 'noopener noreferrer'}
              className="text-accent hover:underline"
            >
              {element}
            </a>
          );
        }
      }
    }

    return <React.Fragment key={index}>{element}</React.Fragment>;
  };

  const renderNode = (node: TiptapNode, index: number): React.ReactNode => {
    if (node.type === 'text') {
      return renderText(node, index);
    }

    const children = node.content?.map((child, i) => renderNode(child, i)) || null;

    switch (node.type) {
      case 'doc':
        return <div className="tiptap-doc">{children}</div>;
      case 'paragraph':
        return <p key={index} className="mb-4">{children}</p>;
      case 'heading':
        if (node.attrs?.level === 2) {
          return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{children}</h2>;
        }
        if (node.attrs?.level === 3) {
          return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{children}</h3>;
        }
        return <h4 key={index} className="text-lg font-bold mt-4 mb-2">{children}</h4>;
      case 'bulletList':
        return <ul key={index} className="list-disc pl-6 mb-4 space-y-2">{children}</ul>;
      case 'orderedList':
        return <ol key={index} className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>;
      case 'listItem':
        return <li key={index}>{children}</li>;
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-accent pl-4 italic text-text-muted my-4">
            {children}
          </blockquote>
        );
      case 'image':
        const src = getArticleImageUrl(node.attrs?.src) || node.attrs?.src;
        if (!src) return null;
        return (
          <figure key={index} className="my-8">
            <div className="relative w-full rounded-lg overflow-hidden shadow-sm border border-border-light">
              <img
                src={src}
                alt={node.attrs?.alt || 'Article Image'}
                title={node.attrs?.title || undefined}
                className="w-full h-auto object-cover max-w-full mx-auto rounded-md"
              />
            </div>
            {node.attrs?.title && (
              <figcaption className="text-center text-sm text-text-muted mt-2">
                {node.attrs.title}
              </figcaption>
            )}
          </figure>
        );
      case 'horizontalRule':
        return <hr key={index} className="my-8 border-t border-border-light" />;
      default:
        // Fallback for unknown blocks, just render children if they exist
        if (children) {
          return <div key={index}>{children}</div>;
        }
        return null;
    }
  };

  return <>{renderNode(content, 0)}</>;
}
