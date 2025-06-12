# Personal Portfolio Website

A minimalist, technically-inspired portfolio website built with Next.js, Tailwind CSS, and modern web technologies. The design emphasizes a backend developer's aesthetic while maintaining professional appeal and user engagement. Features a comprehensive admin authentication system with AI-powered content management.

## Features

### Core Features
- 🌓 **Dark/Light Mode Toggle**
- 🎵 **Background Music Player**
  - YouTube playlist integration
  - Animated music bars indicator
  - Theme-aware styling
- 💭 **Dynamic Quote System**
  - Auto-rotating quotes
  - Manual refresh option
- 🎨 **Minimalist Design**
  - Clean, technical aesthetic
  - Responsive layout
  - Smooth animations
- 🔗 **Social Integration**
  - GitHub profile link
  - LinkedIn profile link
  - Email contact
- 📱 **Fully Responsive**
- ♿ **Accessibility Features**

### Admin Management System 🔐
- **Secure Authentication**
  - SHA256 password hashing
  - Environment variable protection
  - Floating lock/unlock UI control
  - React Context state management

- **AI-Powered Content Creation** 🤖
  - Google Gemini AI integration
  - Style-aware content generation
  - Note type selection (TIL/Technical/General)
  - Automatic frontmatter generation
  - Live preview and regeneration

- **Note Management** 📝
  - Create notes with AI assistance
  - Delete notes with confirmation
  - Hover-reveal admin controls
  - GitHub API integration for deployment
  - Real-time UI updates

- **Professional UX** ✨
  - Floating admin controls (bottom-left lock, bottom-right create)
  - Role-based UI rendering
  - Confirmation dialogs for destructive actions
  - Clean separation of admin/public interface

### Content Management
- **Dynamic Notes System**
  - Markdown-based blog posts
  - Tag and category filtering
  - Dynamic content loading
  - SEO optimization
- **Resume Page**
  - Markdown-based content
  - CV download functionality
  - Structured sections with beautiful cards
- **Contact Form**
  - Email integration (Resend)
  - Form validation and error handling
  - Automatic confirmation emails

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Fonts**: Space Grotesk/Inter
- **Authentication**: SHA256 hashing, React Context
- **Content**: Markdown with gray-matter frontmatter
- **AI**: Google Gemini API
- **Email**: Resend API
- **APIs**: YouTube IFrame API, GitHub API

## Getting Started

### 1. Clone and Install
```bash
git clone [your-repo-url]
cd [your-repo-name]
npm install
```

### 2. Environment Setup
Create a `.env.local` file with:

```env
# Core Features
NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=your_playlist_id

# Admin Authentication (generate using npm run auth:generate)
QUICK_CREATE_PASSWORD_HASH=your_generated_hash

# AI Content Generation
GOOGLE_AI_API_KEY=your_google_ai_api_key

# GitHub API (for production note management)
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name

# Email Service
RESEND_API_KEY=your_resend_api_key
```

### 3. Generate Admin Password
```bash
# Generate secure password hash
npm run auth:generate

# Follow prompts to set your admin password
# Copy the generated hash to QUICK_CREATE_PASSWORD_HASH
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/         # React components
│   ├── AdminLogin.tsx    # Admin authentication
│   ├── QuickCreateNote.tsx # AI note creation
│   ├── NoteItem.tsx      # Note management
│   └── ...               # Other components
├── contexts/           # React contexts
│   └── AdminAuthContext.tsx # Auth state management
├── api/               # API routes
│   ├── auth/             # Authentication endpoints
│   ├── notes/            # Note CRUD operations
│   └── ...
├── data/              # Static data
├── notes/             # Notes pages
└── ...
content/
├── notes/             # Markdown blog posts
└── resume.md          # Resume content
scripts/
├── blog-assistant.js     # CLI blog helper
├── generate-password-hash.js # Admin password generator
└── ...
```

## Admin Features Usage

### 1. **Admin Login**
- Click the 🔒 lock icon (bottom-left corner)
- Enter your admin password
- Icon changes to 🔓 and admin controls appear

### 2. **Create Notes**
- After login, click the ➕ button (bottom-right)
- Choose note type (TIL/Technical/General)
- Enter your requirements or ideas
- AI generates content based on your writing style
- Preview, regenerate, or save the note

### 3. **Delete Notes**
- Hover over any note to reveal delete button
- Click delete and confirm the action
- Note is removed from both local files and GitHub

### 4. **Security Features**
- All passwords are SHA256 hashed before transmission
- GitHub API integration for production deployment
- Input sanitization and path traversal protection
- Environment variable protection

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Admin Tools
```bash
npm run auth:generate    # Generate admin password hash
npm run blog:assistant   # CLI blog creation helper
```

### Blog Management
```bash
npm run blog:til        # Create TIL post
npm run blog:technical  # Create technical guide
npm run blog:general    # Create general post
```

## Components

### Core Components
- **Header**: Theme toggle, music player, conditional navigation
- **Footer**: Quote system, music player, tech stack diagram (homepage only)
- **Avatar**: Profile image with animated border
- **Navigation**: Internal page links with animations
- **SocialIcons**: External profile links

### Admin Components
- **AdminAuthProvider**: Global authentication context
- **AdminLogin**: Floating lock icon with secure modal
- **QuickCreateNote**: AI-powered note creation interface
- **NoteItem**: Enhanced note cards with delete functionality

### Page Components
- **HomePage**: Landing page with full features
- **ResumePage**: Markdown-based resume with CV download
- **NotesPage**: Dynamic blog with filtering and admin controls
- **ContactPage**: Form with email integration
- **404Page**: Engaging error page with animations

## Customization

### Content
1. Update social links in `components/SocialIcons.tsx`
2. Modify quotes in `app/data/quotes.ts`
3. Replace avatar image in `components/Avatar.tsx`
4. Update resume content in `content/resume.md`
5. Create blog posts in `content/notes/`

### Styling
1. Change theme colors in `tailwind.config.js`
2. Update fonts in Next.js configuration
3. Modify component styles in individual files

### Admin Settings
1. Generate new password hash: `npm run auth:generate`
2. Update GitHub API settings in environment variables
3. Configure AI prompts in `prompts/blog-templates/`

## Security Considerations

### Password Security
- Never store plaintext passwords
- Use environment variables for sensitive data
- Generate strong password hashes
- Regular password rotation recommended

### API Security
- GitHub token with minimal required permissions
- Input validation on all endpoints
- Path traversal protection
- Rate limiting considerations

### Production Deployment
- Verify all environment variables are set
- Test admin authentication flow
- Validate GitHub API integration
- Monitor for security updates

## Development

- Follow TypeScript best practices
- Maintain component-based architecture
- Keep accessibility in mind (ARIA labels, focus management)
- Test across different devices and themes
- Use React Context for global state management
- Implement proper error handling and user feedback

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including admin features)
5. Submit a pull request

## Author

**Phuong Tan Thanh** (& my friend Cursor IDE :>)

*Built with ❤️ using Next.js, TypeScript, and AI-powered content management*
