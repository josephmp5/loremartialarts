'use client'

import { useState, useRef } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showPreview, setShowPreview] = useState(false)

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      formatText('createLink', url)
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      formatText('insertImage', url)
    }
  }

  const toolbarButtons = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'underline', icon: 'U', title: 'Underline' },
    { command: 'separator' },
    { command: 'formatBlock', value: 'h1', icon: 'H1', title: 'Heading 1' },
    { command: 'formatBlock', value: 'h2', icon: 'H2', title: 'Heading 2' },
    { command: 'formatBlock', value: 'h3', icon: 'H3', title: 'Heading 3' },
    { command: 'separator' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
    { command: 'separator' },
    { command: 'justifyLeft', icon: '⬅', title: 'Align Left' },
    { command: 'justifyCenter', icon: '⬄', title: 'Align Center' },
    { command: 'justifyRight', icon: '➡', title: 'Align Right' },
    { command: 'separator' },
    { command: 'custom', action: insertLink, icon: '🔗', title: 'Insert Link' },
    { command: 'custom', action: insertImage, icon: '🖼', title: 'Insert Image' }
  ]

  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      overflow: 'hidden'
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        {toolbarButtons.map((button, index) => {
          if (button.command === 'separator') {
            return (
              <div
                key={index}
                style={{
                  width: '1px',
                  height: '24px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  margin: '0 4px'
                }}
              />
            )
          }

          return (
            <button
              key={index}
              type="button"
              title={button.title}
              onClick={() => {
                if (button.command === 'custom' && button.action) {
                  button.action()
                } else if (button.value) {
                  formatText(button.command, button.value)
                } else {
                  formatText(button.command)
                }
              }}
              style={{
                padding: '4px 8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f5f5dc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: button.command === 'bold' ? 'bold' : 'normal',
                fontStyle: button.command === 'italic' ? 'italic' : 'normal',
                textDecoration: button.command === 'underline' ? 'underline' : 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {button.icon}
            </button>
          )
        })}
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            style={{
              padding: '4px 8px',
              border: 'none',
              background: showPreview ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              color: '#f5f5dc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            {showPreview ? '✏️ Edit' : '👁 Preview'}
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div style={{ position: 'relative' }}>
        {showPreview ? (
          <div
            style={{
              padding: '12px',
              minHeight: '200px',
              color: '#f5f5dc',
              lineHeight: '1.6',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: value }}
            style={{
              padding: '12px',
              minHeight: '200px',
              outline: 'none',
              color: '#f5f5dc',
              lineHeight: '1.6',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            placeholder={placeholder}
          />
        )}
      </div>

      {/* Helper text */}
      <div style={{
        padding: '8px 12px',
        fontSize: '11px',
        color: 'rgba(245, 245, 220, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        Use the toolbar to format your text. Click Preview to see how it will look.
      </div>
    </div>
  )
}
