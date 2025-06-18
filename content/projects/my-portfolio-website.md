---
name: "Personal Portfolio Website"
description: "(This website) A modern, responsive portfolio website built with Next.js and TypeScript, featuring dynamic content management, AI-powered note creation with admin authentication, and a clean, accessible design with markdown-based CMS and comprehensive security features."
link: "https://thanhpt.xyz"
status: "active"
featured: true
startDate: "2025-05-12"
endDate: "ongoing"
technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Markdown", "React", "Resend", "Stagewise", "Google Gemini AI", "GitHub API", "CryptoJS", "SHA256 Hashing"]
category: "web-development"
highlights:
  - "Implemented secure admin authentication system with SHA256 password hashing and React Context state management"
  - "Built AI-powered content creation using Google Gemini API with style-aware blog post generation"
  - "Created professional floating UI controls for admin management (lock/unlock + note creation buttons)"
  - "Integrated GitHub API for production note deployment and comprehensive CRUD operations"
  - "Developed markdown-based CMS with frontmatter metadata and dynamic content filtering"
  - "Implemented note deletion with confirmation dialogs and hover-reveal admin controls"
  - "Built secure API endpoints with input validation and path traversal protection"
  - "Integrated Stagewise AI development tools for enhanced productivity and development workflow"
  - "Deployed responsive design with dark/light theme support and modern UI components"
  - "Contact form integration with Resend API for professional email communication"
  - "Dynamic project and blog management system with tag filtering and search capabilities"
---

# Personal Portfolio Website

A comprehensive portfolio website showcasing my projects, experience, and technical skills. Built with modern web technologies and focused on performance, accessibility, and user experience. Features a complete content management system with AI-powered note creation and a sophisticated admin authentication system for secure content management.

## Key Features

### Admin Management System 🔐
- **Secure Authentication**: SHA256 password hashing with environment variable protection and React Context state management
- **AI-Powered Content Creation**: Google Gemini AI integration for style-aware blog post generation with note type selection (TIL/Technical/General)
- **Professional UX Design**: Floating admin controls with lock/unlock UI (bottom-left) and note creation button (bottom-right)
- **Note Management**: Complete CRUD operations with delete confirmation, hover-reveal controls, and GitHub API integration
- **Security Features**: Input sanitization, path traversal protection, and secure API endpoints

### Content Management System 📝
- **Dynamic Content Management**: Markdown-based CMS for blog posts and project documentation with frontmatter metadata
- **AI Content Generation**: Intelligent content creation that learns from existing writing style and maintains consistency
- **Real-time Updates**: Automatic UI refresh and GitHub deployment for seamless content publishing
- **Advanced Filtering**: Tag-based filtering, category selection, and search capabilities

### Core Features ✨
- **Responsive Design**: Mobile-first approach with clean, modern aesthetics and dark/light theme toggle
- **Performance Optimized**: Server-side rendering and static generation for optimal loading times and SEO
- **Contact Integration**: Professional email service integration with Resend for reliable message delivery
- **Project Showcase**: Dynamic project listing with filtering, categorization, and detailed project pages
- **AI-Powered Development**: Integrated Stagewise toolbar for enhanced development workflow and productivity

## Technical Implementation

The website is built using Next.js 14 with TypeScript, leveraging the latest React features and best practices. The content management system uses markdown files with frontmatter for metadata, processed using remark and rehype plugins for rich formatting and syntax highlighting.

### Security Architecture
- **Client-side Hashing**: SHA256 password hashing before transmission to ensure security
- **Environment Variables**: Secure storage of sensitive data including API keys and password hashes
- **Input Validation**: Comprehensive sanitization and path traversal protection for all file operations
- **GitHub API Integration**: Minimal permission tokens for production content deployment

### AI Integration
- **Google Gemini API**: Advanced AI model for content generation with style consistency
- **Prompt Engineering**: Sophisticated templates for different blog post types with style guide integration
- **Content Processing**: Automatic frontmatter generation and markdown formatting

## Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Authentication**: React Context with SHA256 hashing and environment variable security
- **Content**: Markdown files with frontmatter metadata processed server-side
- **AI Services**: Google Gemini API for intelligent content generation
- **Deployment**: Vercel with automatic deployments and GitHub API integration
- **Email**: Resend API for contact form functionality with professional templates
- **Styling**: Custom design system with dark/light theme support and responsive layout
- **Development Tools**: Stagewise AI integration for enhanced development experience

## Admin Features

### Authentication Flow
1. **Secure Login**: Click lock icon (🔒) at bottom-left corner
2. **Password Entry**: SHA256-hashed password authentication
3. **Visual Feedback**: Lock transforms to unlock icon (🔓) when authenticated
4. **Admin Controls**: Create and delete buttons appear for authenticated users

### Content Creation
1. **AI-Powered Generation**: Click plus button (➕) to open note creation modal
2. **Type Selection**: Choose from TIL, Technical, or General post types
3. **Style-Aware AI**: AI generates content based on existing writing patterns
4. **Live Preview**: Real-time preview with regeneration capability
5. **Automatic Deployment**: Save triggers GitHub API for production deployment

### Note Management
1. **Delete Functionality**: Hover over notes to reveal delete buttons
2. **Confirmation Dialogs**: User confirmation required for destructive actions
3. **Real-time Updates**: UI automatically refreshes after operations
4. **GitHub Integration**: Production files updated via API calls

## Performance & Features

- **Fast Loading**: Optimized with Next.js SSR and static generation
- **SEO Friendly**: Proper meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Mobile Responsive**: Seamless experience across all device sizes
- **Modern UI**: Clean design with smooth animations and transitions
- **Secure Admin Interface**: Professional authentication with role-based UI rendering
- **AI-Enhanced Workflow**: Intelligent content creation reducing manual writing time

## Security Considerations

- **Password Security**: No plaintext passwords stored, environment variable protection
- **API Security**: Minimal GitHub token permissions (Contents: Write, Metadata: Read)
- **Input Validation**: Comprehensive sanitization on all user inputs
- **Path Protection**: Prevention of directory traversal attacks
- **Rate Limiting**: Consideration for GitHub API usage limits

## Links

- **Live Application**: [thanhpt.xyz](https://thanhpt.xyz)
- **Source Code**: [GitHub Repository](https://github.com/ptt3199/my-website)
- **Admin Panel**: Accessible via lock icon when authenticated (production deployment)