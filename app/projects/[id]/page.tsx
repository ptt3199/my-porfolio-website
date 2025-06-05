'use client'

import { ProjectLayout } from '../../components/project-layout'
import { getProjectApp } from '../../data/projects'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectApp(params.id)
  
  if (!project) {
    notFound()
  }

  return (
    <ProjectLayout
      src={project.url}
      title={project.title}
      description={project.description}
    />
  )
} 