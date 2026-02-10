import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.tier !== 'master') {
    return NextResponse.json({ error: 'Master tier required' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20

  const where = category && category !== 'all' ? { category } : {}

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { replies: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ])

  return NextResponse.json({ posts, total, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.tier !== 'master') {
    return NextResponse.json({ error: 'Master tier required' }, { status: 403 })
  }

  const { title, content, category } = await req.json()

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Title and content required' }, { status: 400 })
  }

  const post = await prisma.post.create({
    data: {
      userId: session.user.id,
      title: title.trim(),
      content: content.trim(),
      category: category || 'general',
    },
  })

  return NextResponse.json(post)
}
