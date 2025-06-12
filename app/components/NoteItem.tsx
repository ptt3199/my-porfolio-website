'use client'

import Link from 'next/link'
import { Calendar, Clock, Tag, Trash2, Loader } from 'lucide-react'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { useState } from 'react'
import { NoteMeta } from '../../lib/markdown'

interface NoteItemProps {
  note: NoteMeta
  onNoteDeleted?: () => void
}

export function NoteItem({ note, onNoteDeleted }: NoteItemProps) {
  const { isAuthenticated } = useAdminAuth()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    
    if (!window.confirm(`Are you sure you want to delete "${note.title}"?`)) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch('/api/notes/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: note.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to delete note')
      }

      // Trigger callback to refresh the list
      if (onNoteDeleted) {
        onNoteDeleted()
      } else {
        window.location.reload()
      }

      alert(`Note "${note.title}" deleted successfully`)
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Failed to delete note. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="relative group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Delete button for admin */}
      {isAuthenticated && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-400 p-2 rounded-full disabled:opacity-50"
          title="Delete note"
        >
          {isDeleting ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      )}

      <Link href={`/notes/${note.id}`} className="block">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              {note.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(note.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{note.readTime} min</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {note.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {note.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-gray-400" />
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
} 