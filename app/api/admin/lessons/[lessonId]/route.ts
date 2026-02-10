import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  const { error } = await requireAdmin()
  if (error) return error

  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { module: { select: { title: true } } },
  })

  if (!lesson) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(lesson)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  const { error } = await requireAdmin()
  if (error) return error

  const body = await req.json()

  const lesson = await prisma.lesson.update({
    where: { id: params.lessonId },
    data: {
      title: body.title,
      content: body.content,
      duration: body.duration,
      order: body.order,
    },
  })

  return NextResponse.json(lesson)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  const { error } = await requireAdmin()
  if (error) return error

  await prisma.lesson.delete({ where: { id: params.lessonId } })

  return NextResponse.json({ success: true })
}
