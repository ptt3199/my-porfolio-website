import { NextResponse } from 'next/server'
import { getRawResumeData } from '../../../lib/resume'

export async function GET() {
  try {
    const resumeData = await getRawResumeData()
    
    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(resumeData)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
} 