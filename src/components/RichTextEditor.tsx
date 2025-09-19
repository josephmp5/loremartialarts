'use client'

import { useState } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  const insertText = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea[data-rich-editor="true"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    let newText = before + selectedText + after
    
    // If no text is selected, provide helpful placeholder text
    if (selectedText === '') {
      switch (before) {
        case '<h1>':
          newText = '<h1>Your Heading Here</h1>'
          break
        case '<h2>':
          newText = '<h2>Your Heading Here</h2>'
          break
        case '<h3>':
          newText = '<h3>Your Heading Here</h3>'
          break
        case '<strong>':
          newText = '<strong>Bold Text</strong>'
          break
        case '<em>':
          newText = '<em>Italic Text</em>'
          break
        case '<p>':
          newText = '<p>Your paragraph text here</p>'
          break
        default:
          newText = before + after
      }
    }

    const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end)
    onChange(newValue)

    // Restore cursor position after the inserted text
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = selectedText === '' ? start + newText.length : start + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      const text = prompt('Enter link text:') || url
      insertText(`<a href="${url}">`, `${text}</a>`)
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      insertText(`<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`)
    }
  }

  const toolbarButtons: Array<{
    command: string
    icon?: string
    title?: string
    before?: string
    after?: string
    action?: () => void
  }> = [
    { command: 'bold', icon: 'B', title: 'Bold', before: '<strong>', after: '</strong>' },
    { command: 'italic', icon: 'I', title: 'Italic', before: '<em>', after: '</em>' },
    { command: 'underline', icon: 'U', title: 'Underline', before: '<u>', after: '</u>' },
    { command: 'separator' },
    { command: 'h1', icon: 'H1', title: 'Heading 1', before: '<h1>', after: '</h1>' },
    { command: 'h2', icon: 'H2', title: 'Heading 2', before: '<h2>', after: '</h2>' },
    { command: 'h3', icon: 'H3', title: 'Heading 3', before: '<h3>', after: '</h3>' },
    { command: 'separator' },
    { command: 'ul', icon: '•', title: 'Bullet List', before: '<ul>\n<li>', after: '</li>\n</ul>' },
    { command: 'ol', icon: '1.', title: 'Numbered List', before: '<ol>\n<li>', after: '</li>\n</ol>' },
    { command: 'separator' },
    { command: 'p', icon: 'P', title: 'Paragraph', before: '<p>', after: '</p>' },
    { command: 'br', icon: '↵', title: 'Line Break', before: '<br />', after: '' },
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
                } else if (button.before && button.after !== undefined) {
                  insertText(button.before, button.after)
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
          <textarea
            data-rich-editor="true"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '12px',
              minHeight: '200px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: '#f5f5dc',
              lineHeight: '1.6',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              resize: 'vertical'
            }}
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
        💡 <strong>Easy to use:</strong> Click buttons to insert formatting (like Bold, Headings). If you don't select text first, helpful examples will be added. Click Preview to see the final result.
      </div>
    </div>
  )
}
