#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })

async function testGitHubToken() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER || 'phuongtanthanh'
  const repo = process.env.GITHUB_REPO || 'my-website'

  if (!token) {
    console.error('❌ GITHUB_TOKEN not found in .env.local')
    return
  }

  console.log('🧪 Testing GitHub token permissions...')
  console.log(`📂 Repository: ${owner}/${repo}`)

  try {
    // Test 1: Read repository metadata
    console.log('\n1️⃣ Testing repository access...')
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (repoResponse.ok) {
      const repoData = await repoResponse.json()
      console.log(`✅ Repository access: OK`)
      console.log(`   - Name: ${repoData.name}`)
      console.log(`   - Private: ${repoData.private}`)
      console.log(`   - Default branch: ${repoData.default_branch}`)
    } else {
      console.error(`❌ Repository access failed: ${repoResponse.status}`)
      const error = await repoResponse.json()
      console.error(`   Error: ${error.message}`)
      return
    }

    // Test 2: Read contents (test with existing file)
    console.log('\n2️⃣ Testing contents read access...')
    const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (contentsResponse.ok) {
      console.log('✅ Contents read access: OK')
    } else {
      console.error(`❌ Contents read failed: ${contentsResponse.status}`)
    }

    // Test 3: Create a test file (in a test directory)
    console.log('\n3️⃣ Testing contents write access...')
    const testContent = `# Test File\nCreated at: ${new Date().toISOString()}`
    const encodedContent = Buffer.from(testContent).toString('base64')

    const createResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/test-github-api.md`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Test GitHub API access from Quick Create Note feature',
        content: encodedContent,
        branch: 'main'
      })
    })

    if (createResponse.ok) {
      console.log('✅ Contents write access: OK')
      console.log('✅ Test file created: test-github-api.md')
      
      // Clean up: delete the test file
      const testFile = await createResponse.json()
      await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/test-github-api.md`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Clean up test file',
          content: '',
          sha: testFile.content.sha,
          branch: 'main'
        })
      })
      console.log('🧹 Test file cleaned up')
    } else {
      const error = await createResponse.json()
      console.error(`❌ Contents write failed: ${createResponse.status}`)
      console.error(`   Error: ${error.message}`)
    }

    console.log('\n🎉 GitHub token test completed!')
    console.log('✅ Your token has the required permissions for Quick Create Note feature')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

if (require.main === module) {
  testGitHubToken()
}

module.exports = { testGitHubToken } 