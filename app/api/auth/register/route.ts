import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, welcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, track } = await req.json()

    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        track,
      }
    })

    // Send welcome email
    const welcome = welcomeEmail(name)
    await sendEmail({ to: email, ...welcome })

    return NextResponse.json({ id: user.id })
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
