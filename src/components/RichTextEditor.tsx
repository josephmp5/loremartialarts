'use client'

import { useState, useEffect } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Write your blog post content here...\n\nYou can use Markdown:\n**bold text**\n*italic text*\n# Header\n- Bullet points\n\nJust write naturally!'}
        style={{
          width: '100%',
          height: '400px',
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
        ✨ <strong>Simple Text Editor:</strong> Write your content naturally! Supports basic formatting.
      </div>
    </div>
  )
}
