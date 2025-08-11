'use client'

import { useEffect, useRef } from 'react'
import { Live2DModel } from 'pixi-live2d-display-lipsyncpatch/cubism4'
import { Application, Ticker } from 'pixi.js'

// TODO: ウィンドウサイズが変わったときにキャラクターの位置やサイズが変わらない
export default function Live2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const app = new Application<HTMLCanvasElement>({
      view: canvasRef.current as HTMLCanvasElement,
      resizeTo: window,
      backgroundAlpha: 0
    })

    ;(async () => {
      const model = await Live2DModel.from('/Resources/Hiyori/Hiyori.model3.json', {
        ticker: Ticker.shared
      })

      app.stage.addChild(model)

      // キャラクターの中心を画面の中心に合わせる
      model.anchor.set(0.5, 0.5)
      model.x = app.renderer.width / 2
      model.y = app.renderer.height / 2

      // キャラクターのサイズを画面に合わせる
      const scaleX = app.renderer.width / model.width
      const scaleY = app.renderer.height / model.height
      const scale = Math.min(scaleX, scaleY) * 0.8
      model.scale.set(scale)

      model.on('hit', (hitAreas) => {
        if (hitAreas.includes('body')) {
          model.motion('tap_body')
        }
      })
    })()
  }, [])

  return <canvas ref={canvasRef} />
}
