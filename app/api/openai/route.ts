import { NextRequest, NextResponse } from 'next/server'
import { openai, systemPrompt } from '@/lib/openai'

export async function GET(request: NextRequest) {
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

    const answer = response.choices[0].message?.content

    return NextResponse.json({ answer })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 })
  }
}
