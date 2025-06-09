import { notFound } from 'next/navigation'
import { Header } from '../../components/header'
import { Calendar, ExternalLink, Code, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getProjectById } from '../../../lib/projects'

interface ProjectPageProps {
  params: {
    id: string
  }
}

async function getProject(id: string) {
  try {
    const project = await getProjectById(id)
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id)
  
  if (!project) {
    notFound()
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'archived':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {project.featured && (
                  <Star className="h-6 w-6 text-yellow-500 fill-current" />
                )}
                <span className={`text-sm px-3 py-1 rounded-full capitalize ${getStatusBadgeStyle(project.status)}`}>
                  {project.status}
                </span>
                <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {project.category.replace('-', ' ')}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight mb-4">{project.name}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {project.link && (
              <div className="flex-shrink-0">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Project
                </a>
              </div>
            )}
          </div>

          {/* Project Meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {/* Timeline */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Timeline
              </h3>
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(project.startDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                  {project.endDate && project.endDate !== 'ongoing' && (
                    <> - {new Date(project.endDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}</>
                  )}
                  {project.endDate === 'ongoing' && <> - Present</>}
                </span>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Technologies
              </h3>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="text-gray-900 dark:text-gray-100">
                  {project.technologies.length} technologies used
                </span>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Status
              </h3>
              <div className="capitalize text-gray-900 dark:text-gray-100">
                {project.status} {project.featured && '• Featured'}
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        {project.highlights.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Key Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.highlights.map((highlight: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Content */}
        <div className="mb-12">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:border dark:prose-pre:border-gray-700"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
            
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View Live Project
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 