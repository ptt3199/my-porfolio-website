import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from './components/theme-provider'
import { MusicProvider } from './contexts/music-context'
import StagewiseInit from './components/stagewise-init'
import type { Metadata } from 'next'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: {
    default: 'Phuong Tan Thanh | Full Stack Developer',
    template: '%s | Phuong Tan Thanh'
  },
  description: 'Experienced Backend Developer specializing in FastAPI, PostgreSQL, and microservices architecture. Building scalable systems and elegant solutions with Python, Docker, and DevOps practices.',
  keywords: [
    'Phuong Tan Thanh',
    'Backend Developer',
    'Software Engineer',
    'FastAPI',
    'PostgreSQL',
    'Python',
    'Docker',
    'DevOps',
    'Microservices',
    'Ho Chi Minh City',
    'Vietnam',
    'IPSIP'
  ],
  authors: [{ name: 'Phuong Tan Thanh', url: 'https://phuongtanthanh.vercel.app' }],
  creator: 'Phuong Tan Thanh',
  publisher: 'Phuong Tan Thanh',
  metadataBase: new URL('https://phuongtanthanh.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://phuongtanthanh.vercel.app',
    title: 'Phuong Tan Thanh | Full Stack Developer',
    description: 'Experienced Backend Developer specializing in FastAPI, PostgreSQL, and microservices architecture. Building scalable systems and elegant solutions.',
    siteName: 'Phuong Tan Thanh Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Phuong Tan Thanh - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phuong Tan Thanh | Full Stack Developer',
    description: 'Experienced Backend Developer specializing in FastAPI, PostgreSQL, and microservices architecture.',
    images: ['/og-image.jpg'],
    creator: '@phuongtanthanh',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // You'll need to get this from Google Search Console
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MusicProvider>
          {children}
          </MusicProvider>
        </ThemeProvider>
        <StagewiseInit />
        <div id="stagewise-toolbar-root"></div>
      </body>
    </html>
  )
}
