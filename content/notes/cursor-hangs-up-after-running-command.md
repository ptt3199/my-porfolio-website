---
title: "Fix Cursor Terminal Hanging with ZSH/Powerlevel10k"
description: "Smart on-demand fix for Cursor hanging with ZSH and Powerlevel10k - keep your theme everywhere!"
publishedAt: "2025-06-10"
tags: ["cursor", "terminal", "zsh", "powerlevel10k", "fix"]
category: "IDE"
readTime: 2
---

# Fix Cursor Terminal Hanging with ZSH/Powerlevel10k

If Cursor hangs after running terminal commands and you're using ZSH with Powerlevel10k, here's a smart fix that keeps your beautiful theme everywhere.

## The Problem

Cursor gets stuck in "generating..." state after terminal commands because it can't parse complex shell prompts from themes like Powerlevel10k.

## Our Better Solution

**Our approach is smarter than other workarounds** - keep your beautiful theme everywhere by default, and only use a simple prompt when hanging actually occurs.

### Why This Approach is Better:
- ✅ Keep Powerlevel10k theme everywhere (including Cursor terminal)
- ✅ Only switch to simple mode when actually needed
- ✅ Manual control - you decide when to use the workaround
- ✅ No workflow disruption

### Fix Steps

1. **Backup your config:**
```bash
cp ~/.zshrc ~/.zshrc.backup
```

2. **Add these aliases to ~/.zshrc:**

```bash
# Simple prompt aliases for Cursor compatibility (if needed)
alias simple-prompt='export PS1="➜ %1~ %# "; export PROMPT="➜ %1~ %# "; export RPS1=""; export RPROMPT=""'
alias restore-prompt='source ~/.p10k.zsh 2>/dev/null'
```

3. **Reload config:**
```bash
source ~/.zshrc
```

## Usage

**Try commands normally first** - many work fine with Powerlevel10k:
```bash
npm install
git status
```

**If hanging occurs**, use the simple prompt:
```bash
simple-prompt && npm install
```

**For multiple commands:**
```bash
simple-prompt && npm install && npm run dev
```

**Restore your theme afterward (optional):**
```bash
restore-prompt
```

## Result

- ✅ Beautiful Powerlevel10k theme everywhere by default
- ✅ No hanging when using simple-prompt workaround
- ✅ You control when to apply the fix
- ✅ Perfect for both manual terminal use and AI commands

**Much simpler and smarter** than solutions that disable your theme completely. You get the best of both worlds!