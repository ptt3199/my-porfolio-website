import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.QUICK_CREATE_PASSWORD || 'admin123'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 