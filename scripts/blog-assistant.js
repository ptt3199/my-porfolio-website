#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Blog Assistant - AI-powered content generation
class BlogAssistant {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'content', 'notes');
    this.promptsDir = path.join(process.cwd(), 'prompts', 'blog-templates');
    this.styleGuide = null;
    this.existingPosts = [];
  }

  async initialize() {
    await this.loadStyleGuide();
    await this.loadExistingPosts();
  }

  async loadStyleGuide() {
    try {
      const styleGuidePath = path.join(this.promptsDir, 'style-guide.md');
      this.styleGuide = await fs.readFile(styleGuidePath, 'utf-8');
    } catch (error) {
      console.error('Could not load style guide:', error.message);
    }
  }

  async loadExistingPosts() {
    try {
      const files = await fs.readdir(this.contentDir);
      const markdownFiles = files.filter(file => file.endsWith('.md') && file !== '.gitkeep');
      
      for (const file of markdownFiles) {
        const filePath = path.join(this.contentDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        this.existingPosts.push({ filename: file, content });
      }
    } catch (error) {
      console.error('Could not load existing posts:', error.message);
    }
  }

  generatePrompt(userRequest, postType = 'technical') {
    const existingExamples = this.existingPosts
      .slice(0, 3) // Use 3 most recent examples
      .map(post => `### Example from ${post.filename}:\n${post.content}`)
      .join('\n\n');

    return `# Blog Content Generation Request

## User Request:
${userRequest}

## Writing Style Guide:
${this.styleGuide}

## Existing Content Examples:
${existingExamples}

## Instructions:
1. Analyze the existing content examples to understand the writing style, tone, and structure
2. Follow the style guide precisely for the requested post type
3. Generate a complete blog post that matches the established patterns
4. Include proper frontmatter with appropriate tags, category, and metadata
5. Use the same formatting conventions, emoji usage, and section structures as seen in examples
6. Ensure the content is practical, actionable, and follows the "problem-solving focus" principle

## Output:
Generate a complete markdown file that could be saved directly to content/notes/ folder.
`;
  }

  generateFilename(title) {
    return title
      .toLowerCase()
      .replace(/[⚡💡🔧🎯🚀💡🛠️]/g, '') // Remove emojis
      .replace(/til:\s*/i, '') // Remove TIL: prefix
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Collapse multiple hyphens
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  async createPost(userRequest, postType = 'technical') {
    const prompt = this.generatePrompt(userRequest, postType);
    
    console.log('\n=== BLOG ASSISTANT PROMPT ===\n');
    console.log(prompt);
    console.log('\n=== END PROMPT ===\n');
    
    console.log('Copy the above prompt to Cursor/Claude and paste the generated content back.');
    console.log('The assistant will create the markdown file in the correct format.\n');
    
    return prompt;
  }

  async savePost(markdownContent) {
    // Extract title from frontmatter to generate filename
    const titleMatch = markdownContent.match(/title:\s*["']([^"']+)["']/);
    if (!titleMatch) {
      throw new Error('Could not extract title from markdown frontmatter');
    }

    const title = titleMatch[1];
    const filename = this.generateFilename(title) + '.md';
    const filePath = path.join(this.contentDir, filename);

    // Add current date if not present
    const currentDate = new Date().toISOString().split('T')[0];
    let contentWithDate = markdownContent;
    
    if (!markdownContent.includes('publishedAt:')) {
      contentWithDate = markdownContent.replace(
        /(---\n(?:.*\n)*?)---/,
        `$1publishedAt: "${currentDate}"\n---`
      );
    }

    await fs.writeFile(filePath, contentWithDate, 'utf-8');
    console.log(`✅ Blog post saved to: ${filename}`);
    return filename;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const assistant = new BlogAssistant();
  await assistant.initialize();

  switch (command) {
    case 'create':
      const userRequest = args.slice(1).join(' ');
      if (!userRequest) {
        console.log('Usage: node blog-assistant.js create "your blog post request"');
        console.log('Example: node blog-assistant.js create "TIL about Redis caching performance issues"');
        return;
      }
      await assistant.createPost(userRequest);
      break;

    case 'save':
      console.log('Paste your generated markdown content (end with Ctrl+D):');
      let markdownContent = '';
      process.stdin.setEncoding('utf8');
      
      for await (const chunk of process.stdin) {
        markdownContent += chunk;
      }
      
      if (markdownContent.trim()) {
        await assistant.savePost(markdownContent.trim());
      } else {
        console.log('No content provided.');
      }
      break;

    case 'analyze':
      console.log('=== CURRENT WRITING STYLE ANALYSIS ===\n');
      console.log(`Found ${assistant.existingPosts.length} existing posts:`);
      assistant.existingPosts.forEach(post => {
        console.log(`- ${post.filename}`);
      });
      console.log('\n=== STYLE GUIDE ===\n');
      console.log(assistant.styleGuide);
      break;

    default:
      console.log(`
Blog Assistant - AI-powered content generation

Commands:
  create "<request>"  Generate prompt for new blog post
  save               Save generated markdown content to file
  analyze            Show current style analysis
  
Examples:
  node blog-assistant.js create "TIL about Docker volume permissions"
  node blog-assistant.js create "FastAPI async database connection pooling guide"
  node blog-assistant.js analyze
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = BlogAssistant; 