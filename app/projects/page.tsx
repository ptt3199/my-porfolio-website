'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Header } from '../components/header'
import { Calendar, ExternalLink, Filter, X, Code, Star } from 'lucide-react'

interface ProjectMeta {
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectMeta[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [allTechnologies, setAllTechnologies] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Load data on component mount
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        
        const data = await response.json()
        setProjects(data.projects)
        setCategories(data.categories)
        setAllTechnologies(data.technologies)
      } catch (error) {
        console.error('Error loading projects:', error)
        setError(error instanceof Error ? error.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (selectedCategory && project.category !== selectedCategory) return false
    if (selectedStatus && project.status !== selectedStatus) return false
    if (showFeaturedOnly && !project.featured) return false
    if (selectedTechnologies.length > 0 && !selectedTechnologies.some(tech => project.technologies.includes(tech))) return false
    return true
  })

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const handleTechnologyClick = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  const handleStatusClick = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status)
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTechnologies([])
    setSelectedStatus(null)
    setShowFeaturedOnly(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my work in software development, system design, and technology solutions
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h3>
            {(selectedCategory || selectedTechnologies.length > 0 || selectedStatus || showFeaturedOnly) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Featured Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full transition-colors cursor-pointer hover:opacity-80 ${
                  showFeaturedOnly
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}
              >
                <Star className="h-4 w-4" />
                Featured Only
              </button>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
              {['active', 'completed', 'archived'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusClick(status)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer hover:opacity-80 capitalize ${
                    selectedStatus === status
                      ? getStatusBadgeStyle(status) + ' ring-2 ring-offset-2 ring-blue-500'
                      : getStatusBadgeStyle(status)
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer hover:opacity-80 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  }`}
                >
                  {category.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Technology Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Technologies:</span>
              {allTechnologies.slice(0, 12).map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechnologyClick(tech)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer hover:opacity-80 ${
                    selectedTechnologies.includes(tech)
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory || selectedTechnologies.length > 0 || selectedStatus || showFeaturedOnly) && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <span className="font-medium">Active filters:</span>
              {showFeaturedOnly && (
                <span className="px-2 py-1 bg-yellow-500 text-white rounded text-xs flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </span>
              )}
              {selectedStatus && (
                <span className="px-2 py-1 bg-green-600 text-white rounded text-xs capitalize">
                  {selectedStatus}
                </span>
              )}
              {selectedCategory && (
                <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
                  {selectedCategory.replace('-', ' ')}
                </span>
              )}
              {selectedTechnologies.map(tech => (
                <span key={tech} className="px-2 py-1 bg-gray-600 text-white rounded text-xs">
                  {tech}
                </span>
              ))}
              <span className="text-gray-600 dark:text-gray-400">
                ({filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found)
              </span>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow overflow-hidden cursor-pointer hover:border-blue-300 dark:hover:border-blue-600"
            >
              {/* Project Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadgeStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                    {project.endDate && project.endDate !== 'ongoing' && (
                      <> - {new Date(project.endDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}</>
                    )}
                    {project.endDate === 'ongoing' && <> - Present</>}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Code className="h-4 w-4 text-gray-400" />
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-primary dark:text-secondary">Key Highlights:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary dark:text-secondary mt-1">•</span>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hover Indicator */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {projects.length === 0 
                ? "No projects available yet. Check back soon for my latest work!"
                : "No projects match your current filters. Try adjusting your selection or clear all filters."
              }
            </p>
          </div>
        )}
      </main>
    </div>
  )
} 