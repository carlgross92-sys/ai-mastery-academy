import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.tier !== 'master') {
    return NextResponse.json({ error: 'Master tier required' }, { status: 403 })
  }

  const { content } = await req.json()

  if (!content?.trim()) {
    return NextResponse.json({ error: 'Content required' }, { status: 400 })
  }

  const post = await prisma.post.findUnique({ where: { id: params.postId } })
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const reply = await prisma.reply.create({
    data: {
      postId: params.postId,
      userId: session.user.id,
      content: content.trim(),
    },
    include: { user: { select: { id: true, name: true } } },
  })

  return NextResponse.json(reply)
}
