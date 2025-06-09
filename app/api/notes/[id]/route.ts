import { NextResponse } from 'next/server'
import { getNoteById } from '../../../../lib/markdown'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await getNoteById(params.id)

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error('Error fetching note:', error)
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    )
  }
} 