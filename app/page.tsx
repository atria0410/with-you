'use client'

import dynamic from 'next/dynamic'
import { Room } from '@/components/room'

const Live2D = dynamic(() => import('@/components/live2d').then((module) => module.default), {
  ssr: false
})

export default function Home() {
  return (
    <Room>
      <Live2D />
    </Room>
  )
}
