# Quick Create Note Setup Guide

## Environment Variables Setup

Add these environment variables to your `.env.local` file:

```env
# Google AI API Key for note generation
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Quick Create Admin Password
QUICK_CREATE_PASSWORD=your_secure_password_here

# For GitHub API deployment (optional, production only)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
GITHUB_BRANCH=main
```

## Google AI API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` as `GOOGLE_AI_API_KEY`

## How to Use

### 1. On Notes Page
- Look for the floating **+** button in bottom right
- Click to open Quick Create interface

### 2. Authentication
- Enter your admin password (set in `QUICK_CREATE_PASSWORD`)
- Password is required for security

### 3. Create Note
- Select note type: ⚡ TIL, 🛠️ Technical, or 📝 General
- Enter your note idea (be specific!)
- Click "Generate Note" - AI will create content based on your existing style
- Preview the generated content
- Click "Save Note & Deploy" to save and push to git

### 4. Deployment Options

**Development (Local):**
- File saved to `content/notes/`
- Manual git operations needed
- Run: `npm run deploy:notes` or manual git commands

**Production (GitHub API):**
- File saved directly to GitHub via API
- Automatic commit and push
- Vercel automatically deploys
- Note appears on website immediately

## Features

✅ **AI Style Learning**: Analyzes your existing posts to match writing style
✅ **Password Protection**: Simple admin authentication
✅ **Auto File Naming**: Generates SEO-friendly filenames
✅ **Auto Dating**: Adds current date to frontmatter
✅ **Git Integration**: Automatic commit and push
✅ **Live Preview**: See generated content before saving
✅ **Type Recognition**: TIL vs Technical vs General post formats

## Example Requests

### TIL Posts
- "TIL về Docker volume permissions với PostgreSQL"
- "TIL Redis cache invalidation trong microservices"
- "TIL FastAPI background task gotchas"

### Technical Guides
- "Complete guide to PostgreSQL connection pooling"
- "Docker multi-stage builds optimization for Node.js"
- "FastAPI async database best practices"

### General Posts
- "My thoughts on backend development trends 2024"
- "Introduction to system design for beginners"

## Troubleshooting

### "Google AI API key not configured"
- Make sure `GOOGLE_AI_API_KEY` is set in `.env.local`
- Restart your development server

### "Invalid password"
- Check `QUICK_CREATE_PASSWORD` in `.env.local`
- Default is "admin123" if not set

### Git push fails
- Ensure you have git configured with proper credentials
- Set `AUTO_GIT_PUSH=false` to disable auto-push in development

### Generated content looks wrong
- Check if style guide exists: `prompts/blog-templates/style-guide.md`
- Ensure you have existing blog posts in `content/notes/`
- The AI learns from your existing content

## Security Notes

⚠️ **Important**: 
- Change default password immediately
- Use a strong password for production
- Consider additional authentication for production use
- Git credentials should be properly configured for auto-push

## Development vs Production

### Development
- Set `AUTO_GIT_PUSH=false` to avoid auto-commits
- Use a simple password for testing
- Files are saved locally but not pushed

### Production
- Set `AUTO_GIT_PUSH=true` for automatic deployment
- Use a strong password
- Ensure git credentials are properly configured on server 