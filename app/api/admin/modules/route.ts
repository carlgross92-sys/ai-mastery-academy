import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const modules = await prisma.module.findMany({
    include: {
      _count: { select: { lessons: true } },
      course: { select: { title: true } },
    },
    orderBy: { order: 'asc' },
  })

  return NextResponse.json(modules)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error

  const body = await req.json()

  const mod = await prisma.module.create({
    data: {
      courseId: body.courseId,
      title: body.title,
      slug: body.slug,
      description: body.description,
      order: body.order,
      icon: body.icon,
      tier: body.tier || 'free',
    },
  })

  return NextResponse.json(mod)
}
