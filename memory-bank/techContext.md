# Technical Context

## Development Environment
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- lucide-react for icons
- next-themes for theme management
- YouTube IFrame API for background music
- **NEW**: Google Gemini AI for content generation
- **NEW**: GitHub API for production deployment
- **NEW**: CryptoJS for password hashing
- **NEW**: Resend API for email functionality

## Key Dependencies
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.3.0",
    "@tailwindcss/typography": "^0.5.10",
    "crypto-js": "^4.2.0",
    "framer-motion": "^11.0.8",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.344.0",
    "next": "14.1.0",
    "next-themes": "^0.2.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.1",
    "resend": "^3.2.0"
  },
  "devDependencies": {
    "@types/crypto-js": "^4.2.2",
    "@types/node": "^20.11.24",
    "@types/react": "^18.2.61",
    "@types/react-dom": "^18.2.19",
    "@typescript-eslint/eslint-plugin": "^8.32.0",
    "@typescript-eslint/parser": "^8.32.0",
    "autoprefixer": "^10.4.18",
    "eslint": "^8.57.1",
    "eslint-config-next": "14.1.0",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-prettier": "^5.4.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "postcss": "^8.4.35",
    "prettier": "^3.5.3",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
```

## Enhanced Project Structure
```
app/
├── api/                    # API routes
│   ├── auth/
│   │   └── quick-create/   # Admin authentication
│   ├── contact/            # Contact form
│   ├── notes/              # Note CRUD operations
│   │   ├── generate/       # AI content generation
│   │   ├── save/           # Note saving
│   │   ├── save-simple/    # Simple note creation
│   │   └── delete/         # Note deletion
│   ├── projects/           # Project data
│   └── resume/             # Resume data
├── components/
│   ├── AdminLogin.tsx      # Admin authentication UI
│   ├── QuickCreateNote.tsx # AI note creation
│   ├── NoteItem.tsx        # Enhanced note display
│   ├── Header.tsx
│   ├── Avatar.tsx
│   ├── SocialIcons.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ThemeProvider.tsx
├── contexts/               # React contexts
│   └── AdminAuthContext.tsx # Global auth state
├── data/
│   └── quotes.ts           # Quote data
├── notes/                  # Notes pages
│   └── [id]/              # Dynamic note routes
├── projects/               # Project pages
│   └── [id]/              # Dynamic project routes
├── contact/                # Contact page
├── resume/                 # Resume page
├── types/
│   ├── youtube.d.ts
│   └── note.ts            # Note type definitions
├── layout.tsx
├── page.tsx
└── globals.css
content/
├── notes/                  # Markdown blog posts
│   ├── example-post.md
│   └── ...
└── resume.md              # Resume content
scripts/
├── blog-assistant.js       # CLI blog helper
├── generate-password-hash.js # Password hash generator
└── test-github-token.js    # GitHub API tester
prompts/
├── blog-templates/         # AI prompt templates
│   ├── style-guide.md
│   ├── til-template.md
│   ├── technical-template.md
│   └── general-template.md
└── ...
memory-bank/               # Documentation
├── activeContext.md
├── progress.md
├── systemPatterns.md
├── techContext.md
├── productContext.md
└── projectbrief.md
```

## Environment Variables
```env
# Core Features
NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=your_playlist_id

# Admin Authentication
QUICK_CREATE_PASSWORD_HASH=generated_sha256_hash

# AI Content Generation
GOOGLE_AI_API_KEY=your_google_ai_api_key

# GitHub API (for production note management)
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name

# Email Service
RESEND_API_KEY=your_resend_api_key
```

## New Technology Stack Components

### Authentication System
- **CryptoJS**: Client-side SHA256 password hashing
- **React Context**: Global authentication state management
- **Environment Variables**: Secure password hash storage

### AI Content Generation
- **Google Gemini AI**: Content generation based on writing style
- **Prompt Engineering**: Style-aware templates for different post types
- **Markdown Processing**: gray-matter for frontmatter handling

### GitHub Integration
- **GitHub API**: Production file management and deployment
- **Octokit REST API**: Repository content management
- **Base64 Encoding**: File content encoding for API transfers

### Email Integration
- **Resend API**: Contact form and notification emails
- **Serverless Email**: Next.js API routes for email handling

## Code Quality Tools
### Enhanced ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn"
  }
}
```

### Prettier Configuration
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## Design System
- **Font**: Space Grotesk/Inter
- **Colors**:
  - Primary: Theme-based
  - Secondary: Theme-based
  - Success: #10B981 (Emerald 500)
  - Error: #EF4444 (Red 500)
  - Warning: #F59E0B (Amber 500)
  - Dark mode text: #F7FAFC
  - Light mode text: #1A202C
- **Animations**:
  - Transitions: 300ms ease-in-out
  - Hover effects: scale(1.05)
  - Music bars: Custom keyframes
  - Modal transitions: opacity and scale
  - Loading spinners: rotate animation
- **Admin UI**:
  - Floating controls: fixed positioning with z-index
  - Hover reveals: opacity transitions
  - Modal overlays: backdrop blur effects

## Enhanced Development Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "auth:generate": "node scripts/generate-password-hash.js",
    "blog:assistant": "node scripts/blog-assistant.js",
    "blog:til": "node scripts/blog-assistant.js til",
    "blog:technical": "node scripts/blog-assistant.js technical",
    "blog:general": "node scripts/blog-assistant.js general"
  }
}
```

## Security Implementation

### Password Security
```typescript
// Client-side hashing
import CryptoJS from 'crypto-js'
const hashedPassword = CryptoJS.SHA256(password).toString()

// Environment variable validation
const ADMIN_PASSWORD_HASH = process.env.QUICK_CREATE_PASSWORD_HASH
```

### API Security
```typescript
// Input sanitization
const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '')

// Path traversal protection
const resolvedPath = path.resolve(filePath)
if (!resolvedPath.startsWith(allowedDirectory)) {
  throw new Error('Invalid file path')
}
```

### GitHub API Security
```typescript
// Minimal token permissions: Contents (write), Metadata (read)
const headers = {
  'Authorization': `token ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json'
}
```

## Type Definitions

### Note Types
```typescript
interface Note {
  id: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  content: string
}

interface NoteFormData {
  type: 'til' | 'technical' | 'general'
  requirements: string
  title?: string
}
```

### Admin Types
```typescript
interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}
```

## Technical Constraints
- SEO optimization requirements
- Mobile-first responsive design
- Accessibility standards (WCAG 2.1)
- Performance optimization
- Cross-browser compatibility
- Type safety requirements
- **NEW**: GitHub API rate limiting (5000 requests/hour)
- **NEW**: Google AI API usage limits
- **NEW**: Security best practices for authentication
- **NEW**: Real-time UI state synchronization

## Enhanced Development Guidelines
1. Use TypeScript for type safety
2. Follow Next.js 14 best practices
3. Implement responsive design patterns
4. Maintain consistent code style
5. Write clean, documented code
6. Regular testing across devices
7. Follow ESLint and Prettier rules
8. **NEW**: Implement proper error handling for all API calls
9. **NEW**: Use React Context for global state management
10. **NEW**: Validate all user inputs and API responses
11. **NEW**: Follow security best practices for authentication
12. **NEW**: Test admin features thoroughly before deployment

## Environment Requirements
- Node.js 18.17 or later
- npm 9.0.0 or later
- Git for version control
- VS Code/Cursor IDE recommended
- **NEW**: Google AI API key for content generation
- **NEW**: GitHub personal access token for production deployment
- **NEW**: Resend API key for email functionality

## Deployment Considerations
- Vercel deployment configuration
- Environment variable security
- GitHub API integration in production
- AI API key protection
- Database-free architecture (file-based content)
- Serverless function limitations
- Static file generation for performance

## Performance Optimization
- Next.js App Router for better performance
- Static generation where possible
- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind for optimal bundle size
- Code splitting and lazy loading
- API route optimization
- **NEW**: Efficient markdown parsing and caching
- **NEW**: Optimized AI API calls with proper error handling 