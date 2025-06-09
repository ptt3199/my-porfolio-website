import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume | CV Download',
  description: 'Download Phuong Tan Thanh\'s CV - Backend Developer with expertise in FastAPI, PostgreSQL, and microservices. View experience, skills, education, and projects.',
  keywords: [
    'Phuong Tan Thanh CV',
    'Backend Developer Resume',
    'FastAPI Developer',
    'PostgreSQL Expert',
    'Python Developer CV',
    'Software Engineer Resume',
    'Vietnam Developer',
    'IPSIP Developer'
  ],
  openGraph: {
    title: 'Resume | Phuong Tan Thanh - Backend Developer',
    description: 'Download CV of experienced Backend Developer specializing in FastAPI, PostgreSQL, and microservices architecture.',
    type: 'profile',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 