'use client'

import { useEffect, useRef, useState } from 'react'
import { Live2DModel } from 'pixi-live2d-display-lipsyncpatch/cubism4'
import { Application, Ticker } from 'pixi.js'
import Loading from '@/components/loading'
import SpeechBubble from '@/components/speech-bubble'
import Textarea from '@/components/textarea'
import { fetchNijivoice } from '@/utils/nijivoice'
import { fetchOpenai } from '@/utils/openai'

// キャラクターの位置を設定
const setModelPosition = (
  app: Application,
  model: Live2DModel,
  originalWidth: number,
  originalHeight: number
) => {
  model.x = app.renderer.width / 2
  model.y = app.renderer.height / 2

  const scaleX = app.renderer.width / originalWidth
  const scaleY = app.renderer.height / originalHeight
  const scale = Math.min(scaleX, scaleY) * 1.2
  model.scale.set(scale)
}

export default function Live2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [appState, setAppState] = useState<Application | null>(null)
  const [modelState, setModelState] = useState<Live2DModel | null>(null)
  const [originalModelSize, setOriginalModelSize] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const app = new Application<HTMLCanvasElement>({
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
      view: canvasRef.current as HTMLCanvasElement,
      resizeTo: window,
      backgroundAlpha: 0
    })

    setAppState(app)
    initLive2D(app)
  }, [])

  const initLive2D = async (currentApp: Application) => {
    const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json', {
      ticker: Ticker.shared
    })

    currentApp.stage.addChild(model)

    model.anchor.set(0.5, 0.45)

    // モデルの元のサイズを保存（スケール適用前）
    const originalWidth = model.width
    const originalHeight = model.height
    setOriginalModelSize({ width: originalWidth, height: originalHeight })

    setModelPosition(currentApp, model, originalWidth, originalHeight)

    model.on('hit', (hitAreas) => {
      if (hitAreas.includes('body')) {
        model.motion('tap_body')
      }
    })

    setModelState(model)
  }

  useEffect(() => {
    if (!appState || !modelState || !originalModelSize) return

    const onResize = () => {
      if (!canvasRef.current) return

      appState.renderer.resize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)

      // 元のサイズを使用してリサイズ
      setModelPosition(appState, modelState, originalModelSize.width, originalModelSize.height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [appState, modelState, originalModelSize])

  // リップシンク
  const lipsync = async (audioLink: string) => {
    if (!modelState) return
    const volume = 1
    const expression = 4
    const resetExpression = true
    const crossOrigin = 'anonymous'

    modelState.speak(audioLink, {
      volume: volume,
      expression: expression,
      resetExpression: resetExpression,
      crossOrigin: crossOrigin,
      onFinish: () => {
        // 音声再生終了から5秒後に吹き出しを消す
        setTimeout(() => {
          setText('')
        }, 5000)
      }
    })
  }

  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // メッセージ送信
  const send = async (message: string) => {
    if (!modelState) return

    setText('')
    setIsLoading(true)

    const answer = await fetchOpenai(message)
    const audio = await fetchNijivoice(answer, 1.3)
    const audioLink = URL.createObjectURL(audio)
    await lipsync(audioLink)

    setText(answer)
    setIsLoading(false)
  }

  const [bottomOffset, setBottomOffset] = useState(0)

  useEffect(() => {
    if (window.visualViewport === null) return

    const updateOffset = () => {
      const viewport = window.visualViewport
      const heightDiff = window.innerHeight - (viewport?.height ?? 0)
      // キーボードが出ている時だけ高さを補正
      setBottomOffset(heightDiff > 0 ? heightDiff : 0)
    }

    window.visualViewport.addEventListener('resize', updateOffset)
    window.visualViewport.addEventListener('scroll', updateOffset)

    return () => {
      if (window.visualViewport === null) return
      window.visualViewport.removeEventListener('resize', updateOffset)
      window.visualViewport.removeEventListener('scroll', updateOffset)
    }
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} className="h-svh w-full" />

      <div className="absolute top-[250px] left-1/2 z-10 -translate-x-1/2">
        <SpeechBubble text={text} />
      </div>

      <div
        className="fixed bottom-0 left-1/2 w-full max-w-4xl -translate-x-1/2 p-2"
        style={{ bottom: bottomOffset }}
      >
        <Textarea
          placeholder="メッセージを入力してください..."
          onSend={send}
          isLoading={isLoading}
        />
      </div>
      <Loading isLoading={isLoading} />
    </div>
  )
}
