'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Use a simple, reliable markdown editor
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

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

  // Force apply styles after component mounts
  useEffect(() => {
    const applyStyles = () => {
      const style = document.createElement('style')
      style.textContent = `
        .w-md-editor {
          background-color: #2c1810 !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 8px !important;
        }
        
        .w-md-editor textarea,
        .w-md-editor .w-md-editor-text-textarea textarea,
        .w-md-editor .w-md-editor-text-input textarea,
        .w-md-editor .w-md-editor-text textarea,
        .w-md-editor-text-textarea,
        .w-md-editor-text-input,
        .w-md-editor-text {
          background-color: #2c1810 !important;
          color: #ffffff !important;
          font-family: Arial, sans-serif !important;
          font-size: 14px !important;
          border: none !important;
        }
        
        .w-md-editor textarea::placeholder,
        .w-md-editor .w-md-editor-text-textarea::placeholder,
        .w-md-editor .w-md-editor-text-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        .w-md-editor-toolbar {
          background-color: rgba(44, 24, 16, 0.9) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .w-md-editor-toolbar button {
          color: #f5f5dc !important;
        }
        
        .w-md-editor-preview {
          background-color: #2c1810 !important;
          color: #f5f5dc !important;
        }
        
        /* Nuclear option - target everything */
        .w-md-editor * {
          color: #ffffff !important;
        }
        
        .w-md-editor textarea,
        .w-md-editor input {
          color: #ffffff !important;
          background-color: #2c1810 !important;
        }
      `
      document.head.appendChild(style)
      
      // Also try to apply styles directly to elements
      setTimeout(() => {
        const textareas = document.querySelectorAll('.w-md-editor textarea')
        textareas.forEach((textarea: any) => {
          textarea.style.color = '#ffffff'
          textarea.style.backgroundColor = '#2c1810'
        })
      }, 100)
    }
    
    applyStyles()
  }, [])

  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      overflow: 'hidden'
    }}>
      <MDEditor
        value={value || ''}
        onChange={(val) => onChange(val || '')}
        height={400}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={false}
        data-color-mode="dark"
      />
      
      {/* Helper text */}
      <div style={{
        padding: '8px 12px',
        fontSize: '11px',
        color: 'rgba(245, 245, 220, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        ✨ <strong>Simple Markdown Editor:</strong> Use **bold**, *italic*, # headers, - lists. Clean, fast, and works perfectly!
      </div>
    </div>
  )
}
