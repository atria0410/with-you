import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  limit: z.coerce.number().min(1).max(100).default(100).optional()
})

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json({ error: 'ログインしてください' }, { status: 401 })
  }

  const { limit } = schema.parse({
    limit: request.nextUrl.searchParams.get('limit')
  })

  const chatLogs = (
    await prisma.chatLog.findMany({
      where: {
        email: session.user.email
      },
      orderBy: [{ id: 'desc' }, { createdAt: 'desc' }],
      take: limit
    })
  ).reverse()

  return NextResponse.json(chatLogs)
}
