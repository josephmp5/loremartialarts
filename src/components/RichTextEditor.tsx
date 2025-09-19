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


  return (
    <>
      <style jsx global>{`
        .w-md-editor {
          background-color: #f8f9fa !important;
          border: 1px solid #dee2e6 !important;
          border-radius: 8px !important;
        }
        
        .w-md-editor textarea {
          background-color: #f8f9fa !important;
          color: #212529 !important;
          font-family: Arial, sans-serif !important;
          font-size: 14px !important;
          border: none !important;
        }
        
        .w-md-editor textarea::placeholder {
          color: #6c757d !important;
        }
        
        .w-md-editor-toolbar {
          background-color: #e9ecef !important;
          border-bottom: 1px solid #dee2e6 !important;
        }
        
        .w-md-editor-toolbar button {
          color: #495057 !important;
        }
        
        .w-md-editor-toolbar button:hover {
          background-color: #dee2e6 !important;
        }
        
        .w-md-editor-preview {
          background-color: #f8f9fa !important;
          color: #212529 !important;
        }
      `}</style>
      
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
    </>
  )
}
