import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Extract title from frontmatter to generate filename
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/)
    if (!titleMatch) {
      return NextResponse.json({ error: 'Could not extract title from frontmatter' }, { status: 400 })
    }

    const title = titleMatch[1]
    const filename = generateFilename(title) + '.md'
    const contentDir = path.join(process.cwd(), 'content', 'notes')
    const filePath = path.join(contentDir, filename)

    // Add current date if not present
    const currentDate = new Date().toISOString().split('T')[0]
    let contentWithDate = content
    
    if (!content.includes('publishedAt:')) {
      contentWithDate = content.replace(
        /(---\n(?:[\s\S]*?))---/,
        `$1publishedAt: "${currentDate}"\n---`
      )
    }

    // Ensure directory exists
    await fs.mkdir(contentDir, { recursive: true })

    // Save the file locally only
    await fs.writeFile(filePath, contentWithDate, 'utf-8')

    return NextResponse.json({
      success: true,
      filename,
      filePath: `content/notes/${filename}`,
      message: `Note saved locally. To deploy: git add . && git commit -m "Add ${title}" && git push`,
      nextSteps: [
        'File saved to content/notes/',
        'Run: git add .',
        `Run: git commit -m "Add new post: ${title}"`,
        'Run: git push',
        'Vercel will auto-deploy'
      ]
    })
  } catch (error) {
    console.error('Error saving note:', error)
    return NextResponse.json(
      { error: 'Failed to save note. Please try again.' },
      { status: 500 }
    )
  }
}

function generateFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[⚡💡🔧🎯🚀💡🛠️]/g, '') // Remove emojis
    .replace(/til:\s*/i, '') // Remove TIL: prefix
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
} 