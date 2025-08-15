import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { openai, systemPrompt } from '@/lib/openai'
import prisma from '@/lib/prisma'
import { MessageSender } from '@prisma/client'

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json({ error: 'ログインしてください' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text')

  if (!text) {
    return NextResponse.json({ error: 'テキストが入力されていません' }, { status: 400 })
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      model: 'gpt-4o-mini'
    })

    const answer = response.choices[0].message?.content || ''

    // チャットログを保存
    await prisma.chatLog.createMany({
      data: [
        {
          email: session.user.email,
          sender: MessageSender.USER,
          message: text
        },
        {
          email: session.user.email,
          sender: MessageSender.AI,
          message: answer
        }
      ]
    })

    return NextResponse.json({ answer })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 })
  }
}
