# Blog Assistant Usage Guide

## Quick Start Workflow

### 1. Create Blog Post Request
```bash
# Request a TIL post
npm run blog:create "TIL about Redis performance issues with Docker"

# Request a technical guide
npm run blog:create "Complete guide to FastAPI async database connections"

# Request with specific style
npm run blog:create "Docker Compose environment variable best practices"
```

### 2. Copy Generated Prompt
The script will output a comprehensive prompt containing:
- Your request
- Style guide analysis
- Examples from existing posts
- Specific formatting instructions

### 3. Feed to Cursor/Claude
- Copy the entire prompt
- Paste into Cursor chat or Claude
- Let AI generate the complete markdown content

### 4. Save the Result
```bash
# Paste the generated markdown content
npm run blog:save
# Then paste the content and press Ctrl+D (Mac: Cmd+D)
```

### 5. Automatic Processing
The script will:
- ✅ Extract title and generate appropriate filename
- ✅ Add current date if missing
- ✅ Save to `content/notes/` directory
- ✅ Website automatically updates (via Vercel)

## Advanced Usage

### Analyze Current Style
```bash
npm run blog:analyze
```
Shows:
- List of existing posts
- Current style guide
- Writing patterns detected

### Custom Post Types
The assistant recognizes these patterns in your request:
- **TIL posts**: Include "TIL" in request → Short, problem-solving format
- **Technical guides**: Include "guide", "how to", "optimization" → Detailed format
- **General posts**: Include "introduction", "thoughts" → Conversational format

## Example Requests

### TIL Posts
```bash
npm run blog:create "TIL Docker volumes don't reset environment variables"
npm run blog:create "TIL about PostgreSQL connection pooling gotchas"
npm run blog:create "TIL Redis memory optimization in production"
```

### Technical Guides
```bash
npm run blog:create "FastAPI background tasks performance optimization"
npm run blog:create "PostgreSQL query optimization for large datasets"
npm run blog:create "Docker multi-stage builds for Python apps"
```

### General Posts
```bash
npm run blog:create "My thoughts on backend development in 2024"
npm run blog:create "Introduction to system design principles"
```

## File Organization

```
prompts/blog-templates/
├── style-guide.md        # Writing style patterns
└── usage-guide.md        # This file

scripts/
└── blog-assistant.js     # Main automation script

content/notes/
├── existing-post-1.md    # Used as style examples
├── existing-post-2.md    # Auto-analyzed for patterns
└── new-generated-post.md # Your new content
```

## Tips for Best Results

1. **Be specific in requests**: "TIL about Docker volume permissions" vs "Docker stuff"
2. **Include context**: "FastAPI async database with SQLAlchemy" vs "database connections"
3. **Mention target audience**: "beginner guide" vs "advanced optimization"
4. **Include technology stack**: "PostgreSQL with Docker Compose"

## Workflow Benefits

✅ **Consistent Style**: AI learns from your existing content
✅ **Zero Setup**: No CMS, just terminal commands  
✅ **Version Control**: Everything tracked in Git
✅ **Auto Deploy**: Vercel deploys on Git push
✅ **Flexible**: Works with any AI assistant (Cursor, Claude, etc.)

## Troubleshooting

### Script not found?
```bash
chmod +x scripts/blog-assistant.js
```

### Style guide missing?
The script will create templates if they don't exist.

### Content not saving?
Ensure your markdown has proper frontmatter with a `title` field.

---

*Happy blogging! 🚀* 