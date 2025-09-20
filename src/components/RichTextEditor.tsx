'use client'

import { useState, useEffect, useRef } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isClient, setIsClient] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = before + selectedText + after
    
    const newValue = value.substring(0, start) + newText + value.substring(end)
    onChange(newValue)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const insertAtLineStart = (prefix: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const textBeforeCursor = value.substring(0, start)
    const textAfterCursor = value.substring(start)
    
    // Find the start of the current line
    const lastNewlineIndex = textBeforeCursor.lastIndexOf('\n')
    const lineStart = lastNewlineIndex + 1
    const lineEnd = textAfterCursor.indexOf('\n') === -1 ? value.length : start + textAfterCursor.indexOf('\n')
    
    const lineText = value.substring(lineStart, lineEnd)
    
    // Remove existing prefix if present
    let newLineText = lineText
    if (prefix === '# ' && lineText.startsWith('# ')) {
      newLineText = lineText.substring(2)
    } else if (prefix === '## ' && lineText.startsWith('## ')) {
      newLineText = lineText.substring(3)
    } else if (prefix === '### ' && lineText.startsWith('### ')) {
      newLineText = lineText.substring(4)
    } else {
      newLineText = prefix + lineText
    }

    const newValue = value.substring(0, lineStart) + newLineText + value.substring(lineEnd)
    onChange(newValue)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = lineStart + newLineText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  if (!isClient) {
    return (
      <div style={{
        height: 400,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(245, 245, 220, 0.6)'
      }}>
        Loading editor...
      </div>
    )
  }

  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.95)',
      overflow: 'hidden'
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '8px 12px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'rgba(0, 0, 0, 0.02)'
      }}>
        <button
          type="button"
          onClick={() => insertText('**', '**')}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            color: '#333',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => insertText('*', '*')}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            color: '#333',
            fontSize: '12px',
            cursor: 'pointer',
            fontStyle: 'italic'
          }}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertAtLineStart('# ')}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            color: '#333',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          title="Header 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => insertAtLineStart('## ')}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            color: '#333',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          title="Header 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => insertAtLineStart('### ')}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            color: '#333',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          title="Header 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => insertText('- ')}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff',
            color: '#333',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          title="Bullet List"
        >
          •
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Write your blog post content here...\n\nUse the buttons above or type Markdown:\n**bold text**\n*italic text*\n# Header\n- Bullet points\n\nJust write naturally!'}
        style={{
          width: '100%',
          height: '360px',
          padding: '16px',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
          backgroundColor: 'transparent',
          color: '#212529',
          background: 'transparent'
        }}
      />
      
      {/* Helper text */}
      <div style={{
        padding: '8px 16px',
        fontSize: '11px',
        color: '#6c757d',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'rgba(0, 0, 0, 0.02)'
      }}>
        ✨ <strong>Simple Text Editor:</strong> Click buttons above for formatting or type Markdown directly!
      </div>
    </div>
  )
}
