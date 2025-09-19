'use client'

import { useState, useRef, useCallback } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  const handleEditorChange = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onChange(content)
    }
  }, [onChange])

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    handleEditorChange()
    editorRef.current?.focus()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      execCommand('insertImage', url)
    }
  }

  const toolbarButtons: Array<{
    command: string
    icon?: string
    title?: string
    value?: string
    action?: () => void
  }> = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'underline', icon: 'U', title: 'Underline' },
    { command: 'separator' },
    { command: 'formatBlock', icon: 'H1', title: 'Heading 1', value: 'h1' },
    { command: 'formatBlock', icon: 'H2', title: 'Heading 2', value: 'h2' },
    { command: 'formatBlock', icon: 'H3', title: 'Heading 3', value: 'h3' },
    { command: 'separator' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
    { command: 'separator' },
    { command: 'formatBlock', icon: 'P', title: 'Paragraph', value: 'p' },
    { command: 'insertLineBreak', icon: '↵', title: 'Line Break' },
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
      <style dangerouslySetInnerHTML={{
        __html: `
          [contenteditable]:empty::before {
            content: attr(data-placeholder);
            color: rgba(245, 245, 220, 0.5);
            pointer-events: none;
            font-style: italic;
          }
          [contenteditable] h1 {
            font-size: 2em;
            font-weight: bold;
            margin: 0.67em 0;
          }
          [contenteditable] h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin: 0.75em 0;
          }
          [contenteditable] h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin: 0.83em 0;
          }
          [contenteditable] p {
            margin: 1em 0;
          }
          [contenteditable] ul, [contenteditable] ol {
            margin: 1em 0;
            padding-left: 40px;
          }
          [contenteditable] strong {
            font-weight: bold;
          }
          [contenteditable] em {
            font-style: italic;
          }
          [contenteditable] u {
            text-decoration: underline;
          }
          [contenteditable] a {
            color: #60a5fa;
            text-decoration: underline;
          }
          [contenteditable] img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 10px 0;
          }
        `
      }} />
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
                  execCommand(button.command, button.value)
                } else {
                  execCommand(button.command)
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
            suppressContentEditableWarning
            onInput={handleEditorChange}
            onBlur={handleEditorChange}
            dangerouslySetInnerHTML={{ __html: value }}
            style={{
              width: '100%',
              padding: '12px',
              minHeight: '200px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: '#f5f5dc',
              lineHeight: '1.6',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
            data-placeholder={placeholder}
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
        Type your content directly. Select text and use toolbar buttons to format it (bold, headings, lists, etc.). Click Preview to see exactly how it will appear on your blog.
      </div>
    </div>
  )
}
