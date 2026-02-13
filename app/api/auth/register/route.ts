import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, welcomeEmail } from '@/lib/email'
import bcrypt from 'bcryptjs'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (!rateLimit(`register:${ip}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, password, track } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        track,
      }
    })

    // Send welcome email
    const welcome = welcomeEmail(name)
    await sendEmail({ to: email, ...welcome })

    return NextResponse.json({ id: user.id })
  } catch (error: any) {
    console.error('Registration error:', error)

    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already registered. Try signing in instead.' },
        { status: 400 }
      )
    }

    if (error?.code === 'P2003' || error?.code === 'P2011') {
      return NextResponse.json(
        { error: 'Missing required information. Please fill in all fields.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Registration failed. Please try again or contact support if the issue persists.' },
      { status: 500 }
    )
  }
}
