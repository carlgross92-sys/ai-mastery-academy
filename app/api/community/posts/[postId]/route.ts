import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.tier !== 'master') {
    return NextResponse.json({ error: 'Master tier required' }, { status: 403 })
  }

  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: {
      user: { select: { id: true, name: true } },
      replies: {
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}
