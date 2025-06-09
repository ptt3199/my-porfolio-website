import { NextResponse } from 'next/server'
import { getAllNotes, getAllCategories, getAllTags } from '../../../lib/markdown'

export async function GET() {
  try {
    const notes = getAllNotes()
    const categories = getAllCategories()
    const tags = getAllTags()

    return NextResponse.json({
      notes,
      categories,
      tags
    })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
} 