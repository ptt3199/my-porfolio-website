import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs/promises'
import path from 'path'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

// Blog Assistant logic (adapted from scripts/blog-assistant.js)
class BlogAssistant {
  private contentDir: string
  private promptsDir: string

  constructor() {
    this.contentDir = path.join(process.cwd(), 'content', 'notes')
    this.promptsDir = path.join(process.cwd(), 'prompts', 'blog-templates')
  }

  async loadStyleGuide() {
    try {
      const styleGuidePath = path.join(this.promptsDir, 'style-guide.md')
      return await fs.readFile(styleGuidePath, 'utf-8')
    } catch (error) {
      console.error('Could not load style guide:', (error as Error).message)
      return ''
    }
  }

  async loadExistingPosts() {
    try {
      const files = await fs.readdir(this.contentDir)
      const markdownFiles = files.filter(file => file.endsWith('.md') && file !== '.gitkeep')
      
      const posts = []
      for (const file of markdownFiles.slice(0, 3)) { // Latest 3 posts
        const filePath = path.join(this.contentDir, file)
        const content = await fs.readFile(filePath, 'utf-8')
        posts.push({ filename: file, content })
      }
      
      return posts
    } catch (error) {
      console.error('Could not load existing posts:', (error as Error).message)
      return []
    }
  }

  async generatePrompt(userRequest: string, postType: string = 'technical') {
    const styleGuide = await this.loadStyleGuide()
    const existingPosts = await this.loadExistingPosts()
    
    const existingExamples = existingPosts
      .map(post => `### Example from ${post.filename}:\n${post.content}`)
      .join('\n\n')

    return `# Blog Content Generation Request

## User Request:
${userRequest}

## Writing Style Guide:
${styleGuide}

## Existing Content Examples:
${existingExamples}

## Instructions:
1. Analyze the existing content examples to understand the writing style, tone, and structure
2. Follow the style guide precisely for the requested post type
3. Generate a complete blog post that matches the established patterns
4. Include proper frontmatter with appropriate tags, category, and metadata
5. Use the same formatting conventions, emoji usage, and section structures as seen in examples
6. Ensure the content is practical, actionable, and follows the "problem-solving focus" principle
7. The publishedAt date will be added automatically - do not include it
8. Generate content in Vietnamese is fine, but keep code examples and technical terms in English

## Output:
Generate ONLY the complete markdown content that could be saved directly to content/notes/ folder.
Do not include any explanatory text outside the markdown content.
`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { idea, type = 'technical' } = await request.json()

    if (!idea) {
      return NextResponse.json({ error: 'Note idea is required' }, { status: 400 })
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json({ error: 'Google AI API key not configured' }, { status: 500 })
    }

    // Initialize blog assistant
    const assistant = new BlogAssistant()
    const prompt = await assistant.generatePrompt(idea, type)

    // Generate content with Google Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const result = await model.generateContent(prompt)
    const response = result.response
    const generatedContent = response.text()

    return NextResponse.json({
      content: generatedContent,
      type,
      idea
    })
  } catch (error) {
    console.error('Error generating note:', error)
    return NextResponse.json(
      { error: 'Failed to generate note. Please try again.' },
      { status: 500 }
    )
  }
} 