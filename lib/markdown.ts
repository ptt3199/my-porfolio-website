import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const contentDirectory = path.join(process.cwd(), 'content/notes')

export interface Note {
  id: string
  title: string
  description: string
  content: string
  publishedAt: string
  tags: string[]
  category: string
  readTime: number
}

export interface NoteMeta {
  id: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  category: string
  readTime: number
}

export function getAllNoteIds(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}

export function getAllNotes(): NoteMeta[] {
  const noteIds = getAllNoteIds()
  
  const notes = noteIds.map(id => {
    const fullPath = path.join(contentDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      id,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      tags: data.tags || [],
      category: data.category,
      readTime: data.readTime || 5,
    }
  })
  
  // Sort by published date (newest first)
  return notes.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getNoteById(id: string): Promise<Note | null> {
  try {
    const fullPath = path.join(contentDirectory, `${id}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content)
    
    const contentHtml = processedContent.toString()
    
    return {
      id,
      title: data.title,
      description: data.description,
      content: contentHtml,
      publishedAt: data.publishedAt,
      tags: data.tags || [],
      category: data.category,
      readTime: data.readTime || 5,
    }
  } catch (error) {
    console.error(`Error reading note ${id}:`, error)
    return null
  }
}

export function getAllCategories(): string[] {
  const notes = getAllNotes()
  return [...new Set(notes.map(note => note.category))]
}

export function getAllTags(): string[] {
  const notes = getAllNotes()
  return [...new Set(notes.flatMap(note => note.tags))]
}

export function getNotesByCategory(category: string): NoteMeta[] {
  const notes = getAllNotes()
  return notes.filter(note => note.category === category)
}

export function getNotesByTag(tag: string): NoteMeta[] {
  const notes = getAllNotes()
  return notes.filter(note => note.tags.includes(tag))
} 