'use client'

import { useEffect, useRef, useState } from 'react'
import { Live2DModel } from 'pixi-live2d-display-lipsyncpatch/cubism4'
import { Application, Ticker } from 'pixi.js'
import Loading from '@/components/loading'
import SpeechBubble from '@/components/speech-bubble'
import Textarea from '@/components/textarea'
import { fetchNijivoice } from '@/utils/nijivoice'
import { fetchOpenai } from '@/utils/openai'

// TODO: ウィンドウサイズが変わったときにキャラクターの位置やサイズが変わらない
export default function Live2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [model, setModel] = useState<Live2DModel | null>(null)

  useEffect(() => {
    const app = new Application<HTMLCanvasElement>({
      view: canvasRef.current as HTMLCanvasElement,
      resizeTo: window,
      backgroundAlpha: 0
    })

    ;(async () => {
      const _model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json', {
        ticker: Ticker.shared
      })

      setModel(_model)

      app.stage.addChild(_model)

      // キャラクターの中心を画面の中心に合わせる
      _model.anchor.set(0.5, 0.5)
      _model.x = app.renderer.width / 2
      _model.y = app.renderer.height / 2

      // キャラクターのサイズを画面に合わせる
      const scaleX = app.renderer.width / _model.width
      const scaleY = app.renderer.height / _model.height
      const scale = Math.min(scaleX, scaleY) * 1.2
      _model.scale.set(scale)

      _model.on('hit', (hitAreas) => {
        if (hitAreas.includes('body')) {
          _model.motion('tap_body')
        }
      })
    })()
  }, [])

  // リップシンク
  const lipsync = async (audioLink: string) => {
    if (!model) return
    const volume = 1
    const expression = 4
    const resetExpression = true
    const crossOrigin = 'anonymous'

    model.speak(audioLink, {
      volume: volume,
      expression: expression,
      resetExpression: resetExpression,
      crossOrigin: crossOrigin
    })
  }

  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // メッセージ送信
  const send = async (message: string) => {
    if (!model) return

    setText('')
    setIsLoading(true)

    const answer = await fetchOpenai(message)
    const audio = await fetchNijivoice(answer, 1.3)
    const audioLink = URL.createObjectURL(audio)
    await lipsync(audioLink)

    setText(answer)
    setIsLoading(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <canvas ref={canvasRef} className="h-full w-full" />

        <div className="absolute top-[200] left-1/2 z-10 -translate-x-1/2">
          <SpeechBubble text={text} />
        </div>

        <div className="absolute bottom-0 left-1/2 w-full max-w-4xl -translate-x-1/2 p-2">
          <Textarea
            placeholder="メッセージを入力してください..."
            onSend={send}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Loading isLoading={isLoading} />
    </div>
  )
}
