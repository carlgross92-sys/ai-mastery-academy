import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendEmail, certificateEarnedEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Must be pro or master tier
  if (!['pro', 'master'].includes(session.user.tier)) {
    return NextResponse.json({ error: 'Pro+ tier required for certificates' }, { status: 403 })
  }

  // Get the course
  const course = await prisma.course.findFirst({ where: { published: true } })
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  // Check if cert already exists
  const existing = await prisma.certificate.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
  })
  if (existing) {
    return NextResponse.json({ certificateId: existing.id })
  }

  // Check all accessible lessons are completed
  const tierAccess: Record<string, string[]> = {
    pro: ['free', 'starter', 'pro'],
    master: ['free', 'starter', 'pro', 'master'],
  }
  const accessibleTiers = tierAccess[session.user.tier] || []

  const accessibleLessons = await prisma.lesson.findMany({
    where: { module: { tier: { in: accessibleTiers } } },
  })

  const completedCount = await prisma.progress.count({
    where: {
      userId: session.user.id,
      completed: true,
      lessonId: { in: accessibleLessons.map(l => l.id) },
    },
  })

  if (completedCount < accessibleLessons.length) {
    return NextResponse.json(
      { error: `Complete all lessons first (${completedCount}/${accessibleLessons.length})` },
      { status: 400 }
    )
  }

  // Generate unique cert number
  const certNumber = `AIM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

  const certificate = await prisma.certificate.create({
    data: {
      userId: session.user.id,
      courseId: course.id,
      certNumber,
    },
  })

  // Send email
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (user) {
    const email = certificateEarnedEmail(user.name, course.title, certificate.id)
    await sendEmail({ to: user.email, ...email })
  }

  return NextResponse.json({ certificateId: certificate.id })
}
