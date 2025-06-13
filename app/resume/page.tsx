'use client'

import { Header } from '../components/header'
import { Avatar } from '../components/avatar'
import { SocialIcons } from '../components/social-icons'
import { Download, ExternalLink } from 'lucide-react'
// API-based loading instead of direct import
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
  name: string
  tagline: string
  avatar: string
  about: string
  rawContent: string
}

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

// Parse markdown content into structured data
function parseResumeContent(content: string) {
  const sections = content.split(/^## /m).filter(Boolean)
  const result: any = {
    experience: [],
    education: [],
    projects: [],
    skills: {},
    certifications: [],
    languages: [],
    volunteering: []
  }

  sections.forEach(section => {
    const lines = section.split('\n').filter(line => line.trim())
    const sectionTitle = lines[0].replace('#', '').trim().toLowerCase()

    if (sectionTitle === 'experience') {
      const experiences = section.split(/^### /m).filter(Boolean).slice(1)
      result.experience = experiences.map(exp => {
        const expLines = exp.split('\n').filter(line => line.trim())
        const title = expLines[0]
        const companyLine = expLines[1]?.match(/\*\*(.*?)\*\* • (.*?) • \*(.*?)\*/)
        
        const responsibilities: string[] = []
        const technologies: string[] = []
        let description = ''
        
        let currentSection = ''
        expLines.forEach(line => {
          if (line.includes('**Key Responsibilities:**')) currentSection = 'responsibilities'
          else if (line.includes('**Technologies:**')) currentSection = 'technologies'
          else if (line.startsWith('- ') && currentSection === 'responsibilities') {
            responsibilities.push(line.substring(2))
          } else if (currentSection === 'technologies' && !line.includes('**')) {
            technologies.push(...line.split(',').map(t => t.trim()))
          } else if (!line.includes('**') && !line.startsWith('- ') && !line.includes('•') && line.length > 10 && !currentSection) {
            description = line
          }
        })

        return {
          position: title,
          company: companyLine?.[1] || '',
          location: companyLine?.[2] || '',
          period: companyLine?.[3] || '',
          description,
          responsibilities,
          skills: technologies
        }
      })
    }
    
    if (sectionTitle === 'education') {
      const educations = section.split(/^### /m).filter(Boolean).slice(1)
      result.education = educations.map(edu => {
        const eduLines = edu.split('\n').filter(line => line.trim())
        const school = eduLines[0]
        const degreeLine = eduLines[1]?.match(/\*\*(.*?)\*\* • \*(.*?)\*/)
        
        const achievements: string[] = []
        const technologies: string[] = []
        
        eduLines.forEach(line => {
          if (line.startsWith('- ')) {
            achievements.push(line.substring(2))
          } else if (line.includes('**Technologies:**')) {
            const techLine = eduLines[eduLines.indexOf(line) + 1]
            if (techLine) {
              technologies.push(...techLine.split(',').map(t => t.trim()))
            }
          }
        })

        const links: any[] = []
        eduLines.forEach(line => {
          if (line.includes('[') && line.includes('](')) {
            const linkMatches = line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)
            for (const match of linkMatches) {
              links.push({ name: match[1], url: match[2] })
            }
          }
        })

        return {
          school,
          major: degreeLine?.[1]?.replace('Bachelor of Engineering in ', '') || '',
          degree: degreeLine?.[1]?.includes('Bachelor') ? 'Bachelor of Engineering' : '',
          period: degreeLine?.[2] || '',
          description: links.length > 0 ? [{ 
            name: 'Graduation Thesis', 
            links, 
            achievements 
          }] : [{ name: 'Achievements', achievements }],
          skills: technologies
        }
      })
    }

    if (sectionTitle === 'skills') {
      const skillLines = section.split('\n').filter(line => line.includes('**') && line.includes(':'))
      skillLines.forEach(line => {
        const match = line.match(/\*\*(.*?)\*\*:\s*(.*)/)
        if (match) {
          result.skills[match[1]] = match[2].split(',').map((s: string) => s.trim())
        }
      })
    }

    if (sectionTitle === 'certifications') {
      const certs = section.split(/^### /m).filter(Boolean).slice(1)
      result.certifications = certs.map(cert => {
        const certLines = cert.split('\n').filter(line => line.trim())
        const name = certLines[0]
        const issuerLine = certLines[1]?.match(/\*\*(.*?)\*\* • \*(.*?)\*/)
        
        const achievements: string[] = []
        certLines.forEach(line => {
          if (line.startsWith('- ')) {
            achievements.push(line.substring(2))
          }
        })

        return {
          name,
          issuer: issuerLine?.[1] || '',
          date: issuerLine?.[2] || '',
          achievements: achievements.length > 0 ? achievements : undefined
        }
      })
    }

    if (sectionTitle === 'languages') {
      const langLines = section.split('\n').filter(line => line.includes('**') && line.includes(':'))
      result.languages = langLines.map(line => {
        const match = line.match(/\*\*(.*?)\*\*:\s*(.*)/)
        if (match) {
          return {
            language: match[1],
            proficiency: match[2]
          }
        }
        return null
      }).filter(Boolean)
    }

    if (sectionTitle === 'volunteering') {
      const volunteers = section.split(/^### /m).filter(Boolean).slice(1)
      result.volunteering = volunteers.map(vol => {
        const volLines = vol.split('\n').filter(line => line.trim())
        const position = volLines[0]
        const orgLine = volLines[1]?.match(/\*\*(.*?)\*\* • \*(.*?)\*/)
        
        const responsibilities: string[] = []
        volLines.forEach(line => {
          if (line.startsWith('- ')) {
            responsibilities.push(line.substring(2))
          }
        })

        return {
          position,
          organization: orgLine?.[1] || '',
          period: orgLine?.[2] || '',
          responsibilities
        }
      })
    }
  })

  return result
}

export default function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [parsedContent, setParsedContent] = useState<any>(null)
  const [projects, setProjects] = useState<ProjectMeta[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  // Load resume data
  useEffect(() => {
    async function loadResume() {
      try {
        const response = await fetch('/api/resume')
        if (response.ok) {
          const data = await response.json()
          console.log('Resume data loaded:', data)
          setResumeData(data)
          const parsed = parseResumeContent(data.rawContent)
          console.log('Parsed resume content:', parsed)
          setParsedContent(parsed)
        }
      } catch (error) {
        console.error('Error loading resume:', error)
      }
    }
    
    loadResume()
  }, [])

  // Load projects
  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          const featuredProjects = data.projects.filter((p: ProjectMeta) => p.featured)
          setProjects(featuredProjects.length > 0 ? featuredProjects.slice(0, 4) : data.projects.slice(0, 4))
        }
      } catch (error) {
        console.error('Error loading projects:', error)
        setProjects([])
      } finally {
        setProjectsLoading(false)
      }
    }
    
    loadProjects()
  }, [])

  if (!resumeData || !parsedContent) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resume...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-24 space-y-12">
        {/* Title Section */}
        <div className="flex flex-col items-center space-y-6 text-center">
          <Avatar src={resumeData.avatar} />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{resumeData.name}</h1>
            <p className="text-xl text-primary dark:text-secondary mt-2">{resumeData.tagline}</p>
          </div>
          <div className="flex items-center gap-6">
            <SocialIcons />
            <a
              href="/documents/CV_Backend_Devops_PhuongTanThanh.pdf"
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
            {resumeData.about}
          </p>
        </Section>

        {/* Experience Section */}
        {parsedContent.experience.length > 0 && (
          <Section title="Experience">
            {parsedContent.experience.map((exp: any, index: number) => (
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
                      {exp.responsibilities.map((resp: string, i: number) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary dark:text-secondary">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill: string, i: number) => (
                        <SkillTag key={i} skill={skill} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education Section */}
        {parsedContent.education.length > 0 && (
          <Section title="Education">
            {parsedContent.education.map((edu: any, index: number) => (
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
                
                {edu.description && edu.description.map((desc: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-semibold text-primary dark:text-secondary">{desc.name}</h4>
                    
                    {desc.links && desc.links.length > 0 && (
                      <div className="flex gap-4">
                        {desc.links.map((link: any, j: number) => (
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
                        {desc.achievements.map((achievement: string, k: number) => (
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
                      {edu.skills.map((skill: string, i: number) => (
                        <SkillTag key={i} skill={skill} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

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
        {Object.keys(parsedContent.skills).length > 0 && (
          <Section title="Skills">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(parsedContent.skills).map(([category, skills]: [string, any]) => (
                <div key={category} className="border border-border rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, i: number) => (
                      <SkillTag key={i} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications Section */}
        {parsedContent.certifications.length > 0 && (
          <Section title="Certifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parsedContent.certifications.map((cert: any, index: number) => (
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
                        {cert.achievements.map((achievement: string, i: number) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Languages Section */}
        {parsedContent.languages && parsedContent.languages.length > 0 && (
          <Section title="Languages">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parsedContent.languages.map((lang: any, index: number) => (
                <div key={index} className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold">{lang.language}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Volunteering Section */}
        {parsedContent.volunteering && parsedContent.volunteering.length > 0 && (
          <Section title="Volunteering">
            {parsedContent.volunteering.map((vol: any, index: number) => (
              <div key={index} className="border border-border rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{vol.position}</h3>
                    <p className="text-primary dark:text-secondary">{vol.organization}</p>
                  </div>
                  <p className="text-sm text-gray-500">{vol.period}</p>
                </div>

                {vol.responsibilities && vol.responsibilities.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary dark:text-secondary">Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {vol.responsibilities.map((resp: string, i: number) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}
      </main>
    </div>
  )
} 