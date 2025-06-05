'use client'

interface ProjectLayoutProps {
  src: string
  title: string
  description?: string
}

export function ProjectLayout({ src, title, description }: ProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h1>
              {description && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
            <a 
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* App Container */}
      <div className="w-full h-[calc(100vh-120px)]">
        <iframe
          src={src}
          className="w-full h-full border-0"
          title={title}
          allow="clipboard-write"
          loading="lazy"
        />
      </div>
    </div>
  )
} 