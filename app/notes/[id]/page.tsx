import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '../../components/header'
import { getNoteById, getAllNoteIds } from '../../../lib/markdown'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'

// Generate static params for all notes
export async function generateStaticParams() {
  const noteIds = getAllNoteIds()
  return noteIds.map((id) => ({ id }))
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await getNoteById(params.id)

  if (!note) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Notes
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {note.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(note.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{note.readTime} min read</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {note.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {note.description}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap pt-4">
              <Tag className="h-4 w-4 text-gray-400" />
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: note.content }}
            className="prose-headings:scroll-mt-16 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-blue-600 dark:prose-code:text-blue-400"
          />
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Notes
            </Link>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Published on {new Date(note.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
} 