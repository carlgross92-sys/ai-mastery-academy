import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (!rateLimit(`lead:${ip}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    await prisma.emailLead.upsert({
      where: { email },
      update: {},
      create: { email, source: 'homepage-lead-magnet' },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
