import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/documents/', // Prevent indexing of private documents
      ],
    },
    sitemap: 'https://thanhpt.xyz/sitemap.xml',
    host: 'https://thanhpt.xyz',
  }
} 