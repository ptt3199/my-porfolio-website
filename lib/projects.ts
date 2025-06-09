import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectMeta {
  id: string
  name: string
  description: string
  link?: string
  status: 'active' | 'completed' | 'archived'
  featured: boolean
  startDate: string
  endDate?: string
  technologies: string[]
  category: string
  highlights: string[]
}

export interface ProjectWithContent extends ProjectMeta {
  content: string
}

// Get all project metadata
export function getAllProjects(): ProjectMeta[] {
  try {
    const fileNames = fs.readdirSync(projectsDirectory)
    const projects = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          id,
          name: data.name,
          description: data.description,
          link: data.link,
          status: data.status,
          featured: data.featured,
          startDate: data.startDate,
          endDate: data.endDate,
          technologies: data.technologies || [],
          category: data.category,
          highlights: data.highlights || [],
        } as ProjectMeta
      })
    
    // Sort by start date (newest first)
    return projects.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// Get project by ID with content
export async function getProjectById(id: string): Promise<ProjectWithContent | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown content
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content)
    
    return {
      id,
      name: data.name,
      description: data.description,
      link: data.link,
      status: data.status,
      featured: data.featured,
      startDate: data.startDate,
      endDate: data.endDate,
      technologies: data.technologies || [],
      category: data.category,
      highlights: data.highlights || [],
      content: processedContent.toString(),
    }
  } catch (error) {
    console.error(`Error reading project ${id}:`, error)
    return null
  }
}

// Get featured projects
export function getFeaturedProjects(): ProjectMeta[] {
  const allProjects = getAllProjects()
  return allProjects.filter(project => project.featured)
}

// Get projects by category
export function getProjectsByCategory(category: string): ProjectMeta[] {
  const allProjects = getAllProjects()
  return allProjects.filter(project => project.category === category)
}

// Get all unique categories
export function getProjectCategories(): string[] {
  const allProjects = getAllProjects()
  const categories = new Set(allProjects.map(project => project.category))
  return Array.from(categories).sort()
}

// Get all unique technologies
export function getProjectTechnologies(): string[] {
  const allProjects = getAllProjects()
  const technologies = new Set(
    allProjects.flatMap(project => project.technologies)
  )
  return Array.from(technologies).sort()
} 