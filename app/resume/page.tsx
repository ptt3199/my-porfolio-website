'use client'

import { Header } from '../components/header'
import { Avatar } from '../components/avatar'
import { SocialIcons } from '../components/social-icons'
import { Download, ExternalLink } from 'lucide-react'
import resumeData from '../data/resume.json'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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

interface ResumeData {
  title: {
    name: string
    tagline: string
    avatar: string
  }
  about: string
  experience: {
    position: string
    company: string
    location: string
    period: string
    description: string
    responsibilities: string[]
    skills: string[]
  }[]
  education: {
    school: string
    major: string
    degree?: string
    period: string
    description?: {
      name: string
      links: {
        name: string
        url: string
      }[]
      achievements: string[]
    }[]
    skills: string[]
  }[]

  skills: Record<string, string[]>
  certifications: {
    name: string
    issuer: string
    date: string
    achievements?: string[]
  }[]
  languages?: {
    language: string
    proficiency: string
  }[]
  volunteering?: {
    position: string
    organization: string
    period: string
    responsibilities: string[]
  }[]
}

const typedResumeData = resumeData as ResumeData

function SkillTag({ skill }: { skill: string }) {
  return (
    <span className="px-3 py-1 text-sm rounded-full bg-accent-muted text-accent hover:bg-accent hover:text-white transition-colors duration-200">
      {skill}
    </span>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-secondary">{title}</h2>
      {children}
    </section>
  )
}

export default function Resume() {
  const [projects, setProjects] = useState<ProjectMeta[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  // Load projects on component mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          // Get featured projects or latest 4 projects
          const featuredProjects = data.projects.filter((p: ProjectMeta) => p.featured)
          setProjects(featuredProjects.length > 0 ? featuredProjects.slice(0, 4) : data.projects.slice(0, 4))
        }
      } catch (error) {
        console.error('Error loading projects:', error)
        // Fallback to empty array - will show empty state
        setProjects([])
      } finally {
        setProjectsLoading(false)
      }
    }
    
    loadProjects()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-24 space-y-12">
        {/* Title Section */}
        <div className="flex flex-col items-center space-y-6 text-center">
          <Avatar src={typedResumeData.title.avatar} />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{typedResumeData.title.name}</h1>
            <p className="text-xl text-primary dark:text-secondary mt-2">{typedResumeData.title.tagline}</p>
          </div>
          <div className="flex items-center gap-6">
            <SocialIcons />
            <a
              href="/documents/CV_PhuongTanThanh.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary dark:bg-secondary text-white hover:bg-accent hover:dark:bg-accent transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* About Section */}
        <Section title="About">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {typedResumeData.about}
          </p>
        </Section>

        {/* Experience Section */}
        <Section title="Experience">
          {typedResumeData.experience.map((exp, index) => (
            <div key={index} className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className="text-primary dark:text-secondary">{exp.company}</p>
                  <p className="text-gray-500">{exp.location}</p>
                </div>
                <p className="text-sm text-gray-500">{exp.period}</p>
              </div>
              
              {exp.description && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary dark:text-secondary">Overview</h4>
                  <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                </div>
              )}

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary dark:text-secondary">Key Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.skills && exp.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary dark:text-secondary">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <SkillTag key={i} skill={skill} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </Section>

        {/* Education Section */}
        <Section title="Education">
          {typedResumeData.education.map((edu, index) => (
            <div key={index} className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{edu.school}</h3>
                  <p className="text-primary dark:text-secondary">
                    {edu.degree} {edu.degree && 'in'} {edu.major}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{edu.period}</p>
              </div>
              
              {edu.description && edu.description.map((desc, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-semibold text-primary dark:text-secondary">{desc.name}</h4>
                  
                  {desc.links && desc.links.length > 0 && (
                    <div className="flex gap-4">
                      {desc.links.map((link, j) => (
                        <a
                          key={j}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-dark transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}

                  {desc.achievements && desc.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {desc.achievements.map((achievement, k) => (
                        <li key={k}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {edu.skills && edu.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary dark:text-secondary">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill, i) => (
                      <SkillTag key={i} skill={skill} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </Section>

        {/* Projects Section */}
        <Section title="Featured Projects">
          {projectsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">Loading projects...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">
                          <Link
                            href={`/projects/${project.id}`}
                            className="hover:text-primary dark:hover:text-secondary transition-colors duration-200"
                          >
                            {project.name}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                            {project.category.replace('-', ' ')}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                            project.status === 'active' 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : project.status === 'completed'
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary dark:text-secondary">Overview</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {project.highlights.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-primary dark:text-secondary">Key Highlights</h4>
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

                    {project.technologies.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-primary dark:text-secondary">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech, i) => (
                            <SkillTag key={i} skill={tech} />
                          ))}
                          {project.technologies.length > 6 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                              +{project.technologies.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {projects.length > 0 && (
                <div className="text-center mt-8">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    View All Projects
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              )}
              
              {projects.length === 0 && !projectsLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No featured projects available yet.
                  </p>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Browse All Projects
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </Section>

        {/* Skills Section */}
        <Section title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(typedResumeData.skills).map(([category, skills]) => (
              <div key={category} className="border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <SkillTag key={i} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications Section */}
        <Section title="Certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {typedResumeData.certifications.map((cert, index) => (
              <div key={index} className="border border-border rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{cert.name}</h3>
                  <p className="text-primary dark:text-secondary">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </div>

                {cert.achievements && cert.achievements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary dark:text-secondary">Achievements</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {cert.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  )
} 