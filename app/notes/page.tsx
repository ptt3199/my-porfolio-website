'use client'

import { useState, useEffect } from 'react'
import { Header } from '../components/header'
import { QuickCreateNote } from '../components/QuickCreateNote'
import { AdminLogin } from '../components/AdminLogin'
import { NoteItem } from '../components/NoteItem'
import { AdminAuthProvider } from '../contexts/AdminAuthContext'
import { X } from 'lucide-react'

interface NoteMeta {
  id: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  category: string
  readTime: number
}

function NotesPageContent() {
  const [notes, setNotes] = useState<NoteMeta[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Load data on component mount
  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/notes')
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      
      const data = await response.json()
      setNotes(data.notes)
      setCategories(data.categories)
      setAllTags(data.tags)
    } catch (error) {
      console.error('Error loading notes:', error)
      setError(error instanceof Error ? error.message : 'Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Filter and sort notes
  const filteredNotes = notes.filter(note => {
    // Filter by category
    if (selectedCategory && note.category !== selectedCategory) return false
    // Filter by tags
    if (selectedTags.length > 0 && !selectedTags.some(tag => note.tags.includes(tag))) return false
    return true
  })

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTags([])
  }

  const handleNoteCreatedOrDeleted = () => {
    loadData() // Refresh the data
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading notes...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <button 
              onClick={loadData} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Notes & Writings</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My thoughts on backend development, system design, and technology insights
          </p>
        </div>

        {/* Filter Tags */}
        {(categories.length > 0 || allTags.length > 0) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Categories & Tags</h3>
              {(selectedCategory || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer hover:opacity-80 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  }`}
                >
                  {category}
                </button>
              ))}
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer hover:opacity-80 ${
                    selectedTags.includes(tag)
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(selectedCategory || selectedTags.length > 0) && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Active filters:</span>
              {selectedCategory && (
                <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
                  {selectedCategory}
                </span>
              )}
              {selectedTags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-600 text-white rounded text-xs">
                  #{tag}
                </span>
              ))}
              <span className="text-gray-600 dark:text-gray-400">
                ({filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found)
              </span>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="space-y-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteItem 
                key={note.id} 
                note={note} 
                onNoteDeleted={handleNoteCreatedOrDeleted}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory || selectedTags.length > 0 
                  ? 'No notes found with the selected filters.'
                  : 'No notes found.'
                }
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Admin Controls */}
      <AdminLogin />
      <QuickCreateNote onNoteCreated={handleNoteCreatedOrDeleted} />
    </div>
  )
}

export default function NotesPage() {
  return (
    <AdminAuthProvider>
      <NotesPageContent />
    </AdminAuthProvider>
  )
} 