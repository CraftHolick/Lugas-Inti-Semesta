'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

import { getArticleImageUrl } from '@/lib/supabase/storage-url';
import { mergeAttributes } from '@tiptap/core';

// Extend Image to support tempId attribute and resolve URLs on render
const CustomImage = ImageExtension.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      tempId: {
        default: null,
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const resolvedSrc = getArticleImageUrl(HTMLAttributes.src) || HTMLAttributes.src;
    return ['img', mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, src: resolvedSrc })];
  },
});

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  onInlineImagesChange?: (files: { file: File, url: string, tempId: string }[]) => void;
}

const MenuBar = ({ editor, onAddImage, imageCount }: { editor: Editor | null, onAddImage: () => void, imageCount: number }) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-md">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 my-auto mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 my-auto mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 my-auto mx-1" />
      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
        title="Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      
      <button
        type="button"
        onClick={onAddImage}
        className={`flex items-center gap-1.5 p-1.5 px-2.5 rounded text-sm font-medium hover:bg-gray-200 text-gray-700`}
        title="Tambahkan Gambar"
      >
        <ImageIcon className="w-4 h-4" />
        Tambahkan Gambar
      </button>
      <span className="text-xs text-gray-500 ml-1">Gambar artikel: {imageCount} dari 3</span>

      <div className="flex-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Undo"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Redo"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function TiptapEditor({ value, onChange, onInlineImagesChange }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inlineFiles, setInlineFiles] = useState<{file: File, url: string, tempId: string}[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [imageCount, setImageCount] = useState(0);
  const [savedPosition, setSavedPosition] = useState<number | null>(null);

  // Sync count of image nodes in the current document
  const countImagesInJson = (json: any): number => {
    let count = 0;
    if (json.type === 'image') count++;
    if (json.content) {
      json.content.forEach((node: any) => {
        count += countImagesInJson(node);
      });
    }
    return count;
  };

  const getImagesInJson = (json: any): string[] => {
    let urls: string[] = [];
    if (json.type === 'image' && json.attrs?.src) urls.push(json.attrs.src);
    if (json.content) {
      json.content.forEach((node: any) => {
        urls.push(...getImagesInJson(node));
      });
    }
    return urls;
  };

  const onChangeRef = useRef(onChange);
  const onInlineImagesChangeRef = useRef(onInlineImagesChange);
  const inlineFilesRef = useRef(inlineFiles);

  useEffect(() => {
    onChangeRef.current = onChange;
    onInlineImagesChangeRef.current = onInlineImagesChange;
    inlineFilesRef.current = inlineFiles;
  }, [onChange, onInlineImagesChange, inlineFiles]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] }
      }),
      Link.configure({
        openOnClick: false,
      }),
      CustomImage.configure({
        HTMLAttributes: {
          class: 'rounded-md shadow-sm max-w-full mx-auto my-4',
        },
      }),
    ],
    content: value ? JSON.parse(value) : '',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const currentUrls = getImagesInJson(json);
      setImageCount(currentUrls.length);
      
      // Cleanup orphaned local object URLs using the ref to avoid stale closures
      const prevFiles = inlineFilesRef.current;
      const nextFiles = prevFiles.filter(item => {
        const isKept = currentUrls.includes(item.url);
        if (!isKept && item.url.startsWith('blob:')) {
          URL.revokeObjectURL(item.url);
        }
        return isKept;
      });
      
      if (prevFiles.length !== nextFiles.length) {
        setInlineFiles(nextFiles);
        if (onInlineImagesChangeRef.current) {
          onInlineImagesChangeRef.current(nextFiles);
        }
      }

      if (onChangeRef.current) {
        onChangeRef.current(JSON.stringify(json));
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] max-w-none p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && value) {
      const currentContent = JSON.stringify(editor.getJSON());
      if (currentContent !== value) {
        editor.commands.setContent(JSON.parse(value), { emitUpdate: false });
        setImageCount(getImagesInJson(JSON.parse(value)).length);
      }
    }
  }, [editor, value]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      inlineFiles.forEach(f => {
        if (f.url.startsWith('blob:')) URL.revokeObjectURL(f.url);
      });
    };
  }, []);

  const triggerFilePicker = () => {
    if (imageCount >= 3) {
      alert('Maksimal 3 gambar dalam satu artikel');
      return;
    }
    if (editor) {
      setSavedPosition(editor.state.selection.to);
    }
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    if (!file) return;

    if (imageCount >= 3) {
      alert('Maksimal 3 gambar dalam satu artikel');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5 MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP');
      return;
    }

    setSelectedFile(file);
    setAltText('');
    setCaption('');
    setImageModalOpen(true);
  };

  const confirmImageInsert = () => {
    if (!altText.trim()) {
      alert('Alt text wajib diisi');
      return;
    }

    if (selectedFile && editor) {
      const objectUrl = URL.createObjectURL(selectedFile);
      const tempId = crypto.randomUUID();
      
      const next = [...inlineFiles, { file: selectedFile, url: objectUrl, tempId }];
      setInlineFiles(next);
      if (onInlineImagesChange) onInlineImagesChange(next);

      const pos = savedPosition !== null ? Math.min(savedPosition, editor.state.doc.content.size) : editor.state.selection.to;

      editor
        .chain()
        .focus()
        .insertContentAt(pos, [
          {
            type: 'image',
            attrs: {
              src: objectUrl,
              alt: altText,
              title: caption,
              tempId,
            }
          },
          {
            type: 'paragraph'
          }
        ])
        .setTextSelection(pos + 2) // Place cursor inside the new paragraph
        .run();
    }

    setImageModalOpen(false);
    setSelectedFile(null);
    setSavedPosition(null);
  };

  const cancelImageInsert = () => {
    setImageModalOpen(false);
    setSelectedFile(null);
    setSavedPosition(null);
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden bg-white relative">
      <MenuBar editor={editor} onAddImage={triggerFilePicker} imageCount={imageCount} />
      <div className="max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept="image/jpeg, image/png, image/webp" 
        className="hidden" 
      />

      {imageModalOpen && (
        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Detail Gambar</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Alt Text (Wajib) *</label>
                <input 
                  type="text" 
                  value={altText}
                  onChange={e => setAltText(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-accent"
                  placeholder="Deskripsi untuk pembaca layar..."
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Caption (Opsional)</label>
                <input 
                  type="text" 
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-accent"
                  placeholder="Keterangan yang tampil di bawah gambar..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={cancelImageInsert}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={confirmImageInsert}
                className="px-3 py-1.5 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded"
              >
                Sisipkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
