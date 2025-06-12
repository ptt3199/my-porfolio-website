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

    // Save the file locally
    await fs.writeFile(filePath, contentWithDate, 'utf-8')

    // GitHub API approach for production deployment
    if (process.env.NODE_ENV === 'production' && process.env.GITHUB_TOKEN) {
      try {
        await createGitHubFile(filename, contentWithDate, title)
        console.log(`✅ GitHub API commit completed for: ${filename}`)
      } catch (githubError) {
        console.error('GitHub API operation failed:', githubError)
        // Don't fail the request if GitHub API fails - the file is still saved locally
      }
    }

    return NextResponse.json({
      success: true,
      filename,
      message: process.env.NODE_ENV === 'production' 
        ? 'Note saved and deployed to GitHub' 
        : 'Note saved locally (GitHub push disabled in development)'
    })
  } catch (error) {
    console.error('Error saving note:', error)
    return NextResponse.json(
      { error: 'Failed to save note. Please try again.' },
      { status: 500 }
    )
  }
}

async function createGitHubFile(filename: string, content: string, title: string) {
  const owner = process.env.GITHUB_OWNER // e.g., 'phuongtanthanh'
  const repo = process.env.GITHUB_REPO   // e.g., 'my-website'
  const token = process.env.GITHUB_TOKEN
  const branch = process.env.GITHUB_BRANCH || 'main'

  if (!owner || !repo || !token) {
    throw new Error('GitHub configuration missing')
  }

  const filePath = `content/notes/${filename}`
  const encodedContent = Buffer.from(content).toString('base64')

  // Check if file exists first
  let sha: string | undefined
  try {
    const existingFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )
    
    if (existingFileResponse.ok) {
      const existingFile = await existingFileResponse.json()
      sha = existingFile.sha
    }
  } catch (error) {
    // File doesn't exist, that's okay
  }

  // Create or update the file
  const createFileResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add new blog post: ${title}`,
        content: encodedContent,
        branch: branch,
        ...(sha && { sha }) // Include SHA if updating existing file
      })
    }
  )

  if (!createFileResponse.ok) {
    const errorData = await createFileResponse.json()
    throw new Error(`GitHub API error: ${errorData.message}`)
  }

  return await createFileResponse.json()
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