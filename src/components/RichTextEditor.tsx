'use client'

import { Editor } from '@tinymce/tinymce-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      overflow: 'hidden'
    }}>
      <Editor
        apiKey="no-api-key" // Using free version without API key
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: `
            body { 
              font-family: 'Go3v2', serif; 
              font-size: 14px; 
              color: #2c1810;
              background: #f5f5dc;
              padding: 10px;
            }
            h1 { color: #2c1810; font-size: 2em; margin: 0.67em 0; }
            h2 { color: #2c1810; font-size: 1.5em; margin: 0.75em 0; }
            h3 { color: #2c1810; font-size: 1.17em; margin: 0.83em 0; }
            p { margin: 1em 0; }
            a { color: #dc2626; }
          `,
          placeholder: placeholder || 'Start writing your blog post...',
          skin: 'oxide-dark',
          content_css: 'dark',
          toolbar_mode: 'sliding',
          branding: false,
          resize: false,
          statusbar: false
        }}
      />
      
      {/* Helper text */}
      <div style={{
        padding: '8px 12px',
        fontSize: '11px',
        color: 'rgba(245, 245, 220, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        ✨ <strong>Professional Editor:</strong> Format text just like in Word - bold, headings, lists, links all work visually. No HTML code needed!
      </div>
    </div>
  )
}
