import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error

  const { searchParams } = new URL(req.url)
  const moduleId = searchParams.get('moduleId')

  const where = moduleId ? { moduleId } : {}

  const lessons = await prisma.lesson.findMany({
    where,
    include: {
      module: { select: { title: true } },
      quiz: { select: { id: true } },
    },
    orderBy: { order: 'asc' },
  })

  return NextResponse.json(lessons)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error

  const body = await req.json()

  const lesson = await prisma.lesson.create({
    data: {
      moduleId: body.moduleId,
      title: body.title,
      slug: body.slug,
      content: body.content || '',
      duration: body.duration,
      order: body.order,
    },
  })

  return NextResponse.json(lesson)
}
