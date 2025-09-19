'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import JoditEditor with no SSR - simpler approach
const JoditEditor = dynamic(() => import('jodit-react'), {
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

  // Simple, working config with dark theme
  const config = {
    readonly: false,
    placeholder: placeholder || 'Start writing your blog post...',
    height: 400,
    buttons: 'bold,italic,underline,|,ul,ol,|,outdent,indent,|,font,fontsize,|,brush,paragraph,|,image,link,|,align,|,undo,redo,|,hr,eraser,fullsize',
    removeButtons: ['about', 'print'],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    theme: 'dark',
    editorCssClass: 'dark-editor',
    style: {
      background: '#2c1810',
      color: '#f5f5dc',
      font: '14px Go3v2, serif',
    },
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
    <>
      <style jsx>{`
        :global(.jodit-container) {
          background: #2c1810 !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        :global(.jodit-workplace) {
          background: #2c1810 !important;
        }
        :global(.jodit-wysiwyg) {
          background: #2c1810 !important;
          color: #f5f5dc !important;
          font-family: 'Go3v2', serif !important;
        }
        :global(.jodit-toolbar) {
          background: rgba(44, 24, 16, 0.9) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        :global(.jodit-toolbar-button) {
          color: #f5f5dc !important;
        }
        :global(.jodit-toolbar-button:hover) {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
      <div style={{
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        overflow: 'hidden'
      }}>
        <JoditEditor
          value={value}
          config={config}
          onChange={(content: string) => onChange(content)}
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
    </>
  )
}
