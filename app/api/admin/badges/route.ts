import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const badges = await prisma.badge.findMany({
    include: {
      _count: { select: { users: true } },
    },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json(badges)
}
