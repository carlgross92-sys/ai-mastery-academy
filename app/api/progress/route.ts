import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { checkAndAwardBadges } from '@/lib/badges'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lessonId } = await req.json()

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId,
      }
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId: session.user.id,
      lessonId,
      completed: true,
      completedAt: new Date(),
    }
  })

  const newBadges = await checkAndAwardBadges(session.user.id)

  return NextResponse.json({ ...progress, newBadges })
}
