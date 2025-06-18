import { MetadataRoute } from 'next'
import { getAllProjects } from '../lib/projects'
import { getAllNotes } from '../lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thanhpt.xyz'
  
  // Get all projects and notes for dynamic routes
  const projects = getAllProjects()
  const notes = getAllNotes()

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Dynamic project routes
  const projectRoutes = projects.map((project) => {
    // Validate and parse date, fallback to current date if invalid
    const projectDate = new Date(project.startDate)
    const lastModified = isNaN(projectDate.getTime()) ? new Date() : projectDate
    
    return {
      url: `${baseUrl}/projects/${project.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  // Dynamic note routes
  const noteRoutes = notes.map((note) => {
    // Validate and parse date, fallback to current date if invalid
    const noteDate = new Date(note.publishedAt)
    const lastModified = isNaN(noteDate.getTime()) ? new Date() : noteDate
    
    return {
      url: `${baseUrl}/notes/${note.id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [...staticRoutes, ...projectRoutes, ...noteRoutes]
} 