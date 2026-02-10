import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { error } = await requireAdmin()
  if (error) return error

  const body = await req.json()
  const data: any = {}

  if (body.tier !== undefined) data.tier = body.tier
  if (body.isAdmin !== undefined) data.isAdmin = body.isAdmin

  const user = await prisma.user.update({
    where: { id: params.userId },
    data,
    select: { id: true, name: true, email: true, tier: true, isAdmin: true },
  })

  return NextResponse.json(user)
}
