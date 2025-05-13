import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from './components/theme-provider'
import { MusicProvider } from './contexts/music-context'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata = {
  title: 'Phuong Tan Thanh | Backend Developer',
  description: 'Backend Developer Portfolio',
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
      </body>
    </html>
  )
}
