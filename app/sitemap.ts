import { MetadataRoute } from 'next'
import { getAllProjects } from '../lib/projects'
import { getAllNotes } from '../lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://phuongtanthanh.vercel.app'
  
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
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.startDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic note routes
  const noteRoutes = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.id}`,
    lastModified: new Date(note.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...noteRoutes]
} 