import { NextRequest, NextResponse } from 'next/server'
import CryptoJS from 'crypto-js'

// Store the hash of your password in environment variable
// To generate: console.log(CryptoJS.SHA256('your-password').toString())
const ADMIN_PASSWORD_HASH = process.env.QUICK_CREATE_PASSWORD_HASH || CryptoJS.SHA256('admin123').toString()

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    // Password comes already hashed from frontend
    if (password === ADMIN_PASSWORD_HASH) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 