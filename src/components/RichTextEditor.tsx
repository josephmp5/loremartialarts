'use client'

import JoditEditor from 'jodit-react'
import { useRef } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useRef(null)

  const config = {
    readonly: false,
    placeholder: placeholder || 'Start writing your blog post...',
    height: 400,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', '|',
      'brush', 'paragraph', '|',
      'image', 'link', '|',
      'align', '|',
      'undo', 'redo', '|',
      'hr', 'eraser', 'fullsize'
    ],
    removeButtons: ['about', 'print'],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  }

  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      overflow: 'hidden'
    }}>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(content) => onChange(content)}
        onChange={(content) => onChange(content)}
      />
      
      {/* Helper text */}
      <div style={{
        padding: '8px 12px',
        fontSize: '11px',
        color: 'rgba(245, 245, 220, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        ✨ <strong>100% Free Editor:</strong> Format text visually - bold, headings, lists, images all work like Word. No API keys, no limits, no costs!
      </div>
    </div>
  )
}
