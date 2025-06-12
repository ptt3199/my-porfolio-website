# Blog Writing Style Guide

## Content Categories

### TIL (Today I Learned) Posts
**Format:** `⚡ TIL: [Quick descriptive title]`

**Structure:**
- Title with ⚡ emoji
- Short description (1 line)
- Tags: ["til", "technology", "specific-tool", "quick-fix"]
- Category: "TIL"
- readTime: 1-2 minutes
- Include `tldr` field in frontmatter

**Content Style:**
- Start with "## 💡 The Lesson" 
- Use emojis for sections (💡, 🔧, 🎯)
- Nuclear vs Surgical options for fixes
- End with "**Never forget:** [key insight]"
- Code blocks with clear explanations
- Maximum 2-3 sections

### Technical Deep Dive Posts
**Structure:**
- Descriptive title without emoji
- Detailed description
- Tags: ["technology", "performance", "backend", "specific-tools"]
- Category: "Backend" | "DevOps" | "System Design"
- readTime: 5-10 minutes

**Content Style:**
- Numbered sections (1., 2., 3.)
- Code examples with comments
- Practical, real-world focus
- "Key Takeaways" section at end
- Progressive difficulty (basic → advanced)

### Introduction/General Posts
**Structure:**
- Friendly, conversational title
- Personal touch in description
- Tags: ["introduction", "backend", "blog", "general"]
- Category: "General"
- readTime: 3-5 minutes

**Content Style:**
- Use section emojis (🚀, 💡, 🛠️)
- Bullet points for readability
- Personal philosophy/approach
- "What's Coming Next" sections
- End with signature: "*Happy coding!* *Phuong Tan Thanh*"

## Writing Principles

1. **Clarity over complexity** - Make technical concepts accessible
2. **Practical examples** - Real-world applications over theory
3. **Problem-solving focus** - Address actual developer pain points
4. **Code-first approach** - Show, don't just tell
5. **Concise but complete** - Respect reader's time

## Technical Focus Areas
- Backend development (FastAPI, Python)
- Database optimization (PostgreSQL)
- DevOps practices (Docker, deployment)
- System design principles
- Performance optimization
- Troubleshooting guides

## Content Structure Templates

### TIL Template:
```markdown
---
title: "⚡ TIL: [Brief Problem Description]"
description: "[One-line explanation of the issue and solution]"
publishedAt: "[YYYY-MM-DD]"
tags: ["til", "[main-tech]", "[specific-tool]", "quick-fix"]
category: "TIL"
readTime: 1
tldr: "[Brief summary of the core lesson]"
---

# ⚡ TIL: [Problem Title]

## 💡 The Lesson
[Core insight or principle that caused the issue]

## 🔧 Quick Fix
[Step-by-step solution with code examples]

## 🎯 Key Takeaway
> [Memorable principle or rule to remember]

**Never forget:** [Essential insight to prevent future issues]
```

### Technical Guide Template:
```markdown
---
title: "[Technology] [Action/Topic] [Benefit/Goal]"
description: "[What readers will learn and why it matters]"
publishedAt: "[YYYY-MM-DD]"
tags: ["[main-tech]", "[category]", "[language]", "[specific-aspect]"]
category: "Backend" | "DevOps" | "System Design"
readTime: [5-10]
---

# [Title]

[Brief introduction explaining the context and importance]

## 1. [First Major Section]
[Explanation with code examples]

## 2. [Second Major Section]
[Progressive difficulty, building on previous sections]

## Key Takeaways
[Numbered list of main lessons]
``` 