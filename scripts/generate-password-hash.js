#!/usr/bin/env node

const CryptoJS = require('crypto-js')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('🔐 Password Hash Generator for Quick Create Auth')
console.log('===============================================')

rl.question('Enter your admin password: ', (password) => {
  if (!password.trim()) {
    console.log('❌ Password cannot be empty!')
    rl.close()
    return
  }

  const hash = CryptoJS.SHA256(password).toString()
  
  console.log('\n✅ Password hash generated!')
  console.log('📋 Add this to your .env.local file:')
  console.log('=====================================')
  console.log(`QUICK_CREATE_PASSWORD_HASH=${hash}`)
  console.log('=====================================')
  console.log('\n💡 Usage:')
  console.log('1. Copy the line above to your .env.local file')
  console.log('2. Remove the old QUICK_CREATE_PASSWORD variable')
  console.log('3. Restart your development server')
  
  rl.close()
}) 