'use client'

import Link from 'next/link'
import { Header } from '../components/header'
import { projectApps } from '../data/projects'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Collection of useful web applications and tools that I've built to solve real-world problems
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectApps.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {projectApps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No projects available yet. Check back soon!
            </p>
          </div>
        )}
      </main>
    </div>
  )
} 