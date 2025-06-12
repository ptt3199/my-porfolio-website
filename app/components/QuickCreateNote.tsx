'use client'

import { useState } from 'react'
import { PlusCircle, Loader, Sparkles, X } from 'lucide-react'
import { useAdminAuth } from '../contexts/AdminAuthContext'

interface QuickCreateNoteProps {
  onNoteCreated?: () => void
}

export function QuickCreateNote({ onNoteCreated }: QuickCreateNoteProps) {
  const { isAuthenticated } = useAdminAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [noteIdea, setNoteIdea] = useState('')
  const [noteType, setNoteType] = useState<'til' | 'technical' | 'general'>('til')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const generateNote = async () => {
    if (!noteIdea.trim()) {
      setError('Please enter your note idea')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/notes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: noteIdea,
          type: noteType
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate note')
      }

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error) {
      console.error('Error generating note:', error)
      setError('Failed to generate note. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const saveNote = async () => {
    if (!generatedContent.trim()) {
      setError('No content to save')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const response = await fetch('/api/notes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: generatedContent
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save note')
      }

      const data = await response.json()
      
      // Reset form
      setNoteIdea('')
      setGeneratedContent('')
      setIsOpen(false)
      
      // Trigger page refresh or callback
      if (onNoteCreated) {
        onNoteCreated()
      } else {
        window.location.reload()
      }
      
      alert(`Note saved successfully: ${data.filename}`)
    } catch (error) {
      console.error('Error saving note:', error)
      setError('Failed to save note. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const saveDirectly = async () => {
    if (!noteIdea.trim()) {
      setError('Please enter your note idea')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      // Create a simple markdown from the idea
      const simpleContent = `---
title: "${noteIdea}"
description: "${noteIdea}"
tags: ["quick-note", "${noteType}"]
category: "${noteType === 'til' ? 'TIL' : noteType === 'technical' ? 'Backend' : 'General'}"
readTime: 2
publishedAt: "${new Date().toISOString().split('T')[0]}"
---

# ${noteIdea}

${noteIdea}

*This note was created directly without AI generation.*`

      const response = await fetch('/api/notes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: simpleContent
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save note')
      }

      const data = await response.json()
      
      // Reset form
      setNoteIdea('')
      setGeneratedContent('')
      setIsOpen(false)
      
      // Trigger page refresh or callback
      if (onNoteCreated) {
        onNoteCreated()
      } else {
        window.location.reload()
      }
      
      alert(`Note saved successfully: ${data.filename}`)
    } catch (error) {
      console.error('Error saving note:', error)
      setError('Failed to save note. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const resetForm = () => {
    setNoteIdea('')
    setGeneratedContent('')
    setError('')
    setIsOpen(false)
  }

  // Only show button if authenticated
  if (!isAuthenticated) {
    return null
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
        title="Quick Create Note"
      >
        <PlusCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Quick Create Note
            </h2>
          </div>
          <button
            onClick={resetForm}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Note Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Note Type
            </label>
            <div className="flex gap-2">
              {[
                { value: 'til', label: '⚡ TIL' },
                { value: 'technical', label: '🛠️ Technical' },
                { value: 'general', label: '📝 General' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setNoteType(type.value as any)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    noteType === type.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Note Idea Input */}
          <div>
            <label htmlFor="noteIdea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Note Idea
            </label>
            <textarea
              id="noteIdea"
              value={noteIdea}
              onChange={(e) => setNoteIdea(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Describe your note idea... e.g., 'TIL about Docker volume permissions with PostgreSQL'"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose: Generate AI content or save your idea immediately
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={generateNote}
                disabled={isGenerating || !noteIdea.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate
                  </>
                )}
              </button>
              
              <button
                onClick={saveDirectly}
                disabled={isSaving || !noteIdea.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Immediately'
                )}
              </button>
            </div>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Generated Content (Preview)
              </label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-700 max-h-64 overflow-y-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {generatedContent}
                </pre>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={generateNote}
                  disabled={isGenerating}
                  className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Regenerate
                    </>
                  )}
                </button>
                
                <button
                  onClick={saveNote}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save & Deploy'
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
} 