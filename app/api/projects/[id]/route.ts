import { NextResponse } from 'next/server'
import { getProjectById } from '../../../../lib/projects'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await getProjectById(params.id)
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
} 