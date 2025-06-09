'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Header } from './components/header'
import { Avatar } from './components/avatar'
import { SocialIcons } from './components/social-icons'
import { Navigation } from './components/navigation'
import { Footer } from './components/footer'
import { TechShowcase } from './components/tech-showcase'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Phuong Tan Thanh",
  "alternateName": "Phuong Tan Thanh",
  "description": "Backend Developer specializing in FastAPI, PostgreSQL, and microservices architecture",
  "url": "https://phuongtanthanh.vercel.app",
  "image": "https://phuongtanthanh.vercel.app/suit-avatar.png",
  "sameAs": [
    "https://www.github.com/ptt3199",
    "https://www.linkedin.com/in/thanh-phuongtan/",
  ],
  "jobTitle": "Full Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "IPSIP",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ho Chi Minh City",
      "addressCountry": "Vietnam"
    }
  },
  "knowsAbout": [
    "FastAPI",
    "PostgreSQL",
    "Python",
    "Docker",
    "DevOps",
    "Microservices",
    "Backend Development",
    "Software Engineering"
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "Ho Chi Minh City University of Technology"
  }
}

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Profile data
  const name = 'Phuong Tan Thanh'
  const title = 'Backend Developer · FastAPI · PostgreSQL · DevOps'
  const avatarUrl = '/avatar.png'


  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />

        <main className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen">
          <div className="space-y-8 animate-fade-in">
            <Avatar src={avatarUrl} />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
              <p className="text-xl text-primary dark:text-secondary">{title}</p>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg">
                Building scalable systems and elegant solutions. Passionate about backend
                architecture, distributed systems, and developer experience.
              </p>
            </div>
            <SocialIcons />
            <Navigation />
          </div>

          <div className="hidden md:block">
            <TechShowcase />
          </div>
        </main>

        {/* <Footer /> */}
      </div>
    </>
  )
}
