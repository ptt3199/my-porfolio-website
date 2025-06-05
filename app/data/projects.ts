export interface ProjectApp {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags: string[]
}

export const projectApps: ProjectApp[] = [
  {
    id: 'qrcode-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, and more',
    url: 'https://bank-qrcode-generator-phi.vercel.app/',
    category: 'Utilities',
    tags: ['qr-code', 'generator', 'utility']
  },
  // Add more apps here as needed
  // {
  //   id: 'calculator',
  //   title: 'Calculator',
  //   description: 'Simple calculator app',
  //   url: 'https://your-calculator-app.vercel.app/',
  //   category: 'Utilities',
  //   tags: ['calculator', 'math', 'utility']
  // }
]

export function getProjectApp(id: string): ProjectApp | undefined {
  return projectApps.find(app => app.id === id)
} 