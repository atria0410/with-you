import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const voiceActorId = 'd158278c-c4fa-461a-b271-468146ad51c9' // 冬月 初音
const format = 'mp3'

const url = `https://api.nijivoice.com/api/platform/v1/voice-actors/${voiceActorId}/generate-voice`

const schema = z.object({
  script: z.string().min(1),
  speed: z.coerce.number().min(0.4).max(3.0).default(1.1),
  emotionalLevel: z.coerce.number().min(0).max(1.5).optional(),
  soundDuration: z.coerce.number().min(0).max(1.7).optional()
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const { script, speed, emotionalLevel, soundDuration } = schema.parse({
      script: formData.get('script'),
      speed: formData.get('speed') ?? undefined,
      emotionalLevel: formData.get('emotionalLevel') ?? undefined,
      soundDuration: formData.get('soundDuration') ?? undefined
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NIJIVOICE_API_KEY!,
        accept: 'application/json'
      },
      body: JSON.stringify({
        script,
        speed: speed.toString(),
        emotionalLevel: emotionalLevel?.toString(),
        soundDuration: soundDuration?.toString(),
        format
      })
    })

    const data = await response.json()
    const audioFileUrl = data.generatedVoice.audioFileUrl
    const audioResponse = await fetch(audioFileUrl)
    const audioBuffer = await audioResponse.arrayBuffer()

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString()
      }
    })
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 })
  }
}
