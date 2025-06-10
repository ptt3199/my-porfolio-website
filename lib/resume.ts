import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const resumePath = path.join(process.cwd(), 'content/resume.md')

export interface ResumeData {
  name: string
  tagline: string
  avatar: string
  about: string
  content: string
}

export interface RawResumeData {
  name: string
  tagline: string
  avatar: string
  about: string
  rawContent: string
}

export async function getResumeData(): Promise<ResumeData | null> {
  try {
    if (!fs.existsSync(resumePath)) {
      console.error('Resume file not found:', resumePath)
      return null
    }
    
    const fileContents = fs.readFileSync(resumePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content)
    
    const contentHtml = processedContent.toString()
    
    return {
      name: data.name,
      tagline: data.tagline,
      avatar: data.avatar,
      about: data.about,
      content: contentHtml,
    }
  } catch (error) {
    console.error('Error reading resume:', error)
    return null
  }
}

export async function getRawResumeData(): Promise<RawResumeData | null> {
  try {
    if (!fs.existsSync(resumePath)) {
      console.error('Resume file not found:', resumePath)
      return null
    }
    
    const fileContents = fs.readFileSync(resumePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      name: data.name,
      tagline: data.tagline,
      avatar: data.avatar,
      about: data.about,
      rawContent: content,
    }
  } catch (error) {
    console.error('Error reading resume:', error)
    return null
  }
} 