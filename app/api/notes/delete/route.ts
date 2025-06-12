import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json()

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    // Sanitize filename
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '')
    const fullFilename = sanitizedFilename.endsWith('.md') ? sanitizedFilename : `${sanitizedFilename}.md`
    
    const notesDir = path.join(process.cwd(), 'content', 'notes')
    const filePath = path.join(notesDir, fullFilename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Security check: Make sure the file is within the notes directory
    const resolvedPath = path.resolve(filePath)
    const resolvedNotesDir = path.resolve(notesDir)
    
    if (!resolvedPath.startsWith(resolvedNotesDir)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 })
    }

    // Delete the file
    fs.unlinkSync(filePath)

    // If using GitHub API for deployment (production)
    if (process.env.GITHUB_TOKEN && process.env.NODE_ENV === 'production') {
      try {
        // GitHub API delete
        const response = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/notes/${fullFilename}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
              message: `Delete note: ${fullFilename}`,
              sha: await getFileSha(fullFilename), // Need to get SHA first
            }),
          }
        )

        if (!response.ok) {
          console.error('GitHub API error:', await response.text())
        }
      } catch (githubError) {
        console.error('GitHub deletion failed:', githubError)
        // Continue with local deletion even if GitHub fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Note ${fullFilename} deleted successfully` 
    })

  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}

// Helper function to get file SHA from GitHub (needed for deletion)
async function getFileSha(filename: string): Promise<string | undefined> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/notes/${filename}`,
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      return data.sha
    }
  } catch (error) {
    console.error('Error getting file SHA:', error)
  }
  return undefined
} 