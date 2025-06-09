import { NextResponse } from 'next/server'
import { getAllProjects, getProjectCategories, getProjectTechnologies } from '../../../lib/projects'

export async function GET() {
  try {
    const projects = getAllProjects()
    const categories = getProjectCategories()
    const technologies = getProjectTechnologies()
    
    return NextResponse.json({
      projects,
      categories,
      technologies,
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
} 