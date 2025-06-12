#!/usr/bin/env node

const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

async function deployNotes() {
  try {
    console.log('🚀 Deploying new notes...')
    
    // Check if there are any changes in content/notes/
    const notesDir = path.join(process.cwd(), 'content', 'notes')
    
    if (!fs.existsSync(notesDir)) {
      console.log('❌ Notes directory not found')
      return
    }
    
    // Git operations
    await execCommand('git add content/notes/')
    
    // Check if there are changes to commit
    const status = await execCommand('git status --porcelain content/notes/')
    
    if (!status.trim()) {
      console.log('✅ No new notes to deploy')
      return
    }
    
    const commitMessage = `Add new blog posts - ${new Date().toISOString().split('T')[0]}`
    await execCommand(`git commit -m "${commitMessage}"`)
    
    console.log('📤 Pushing to GitHub...')
    await execCommand('git push origin main')
    
    console.log('✅ Notes deployed successfully!')
    console.log('🌐 Vercel will automatically redeploy your website')
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message)
    process.exit(1)
  }
}

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}

if (require.main === module) {
  deployNotes()
}

module.exports = { deployNotes } 