import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  const { error } = await requireAdmin()
  if (error) return error

  const mod = await prisma.module.findUnique({
    where: { id: params.moduleId },
    include: {
      lessons: { orderBy: { order: 'asc' } },
      course: { select: { title: true } },
    },
  })

  if (!mod) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(mod)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  const { error } = await requireAdmin()
  if (error) return error

  const body = await req.json()

  const mod = await prisma.module.update({
    where: { id: params.moduleId },
    data: {
      title: body.title,
      description: body.description,
      icon: body.icon,
      tier: body.tier,
      order: body.order,
    },
  })

  return NextResponse.json(mod)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  const { error } = await requireAdmin()
  if (error) return error

  await prisma.module.delete({ where: { id: params.moduleId } })

  return NextResponse.json({ success: true })
}
