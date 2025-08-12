'use client'

import dynamic from 'next/dynamic'

const Live2D = dynamic(() => import('@/components/live2d').then((module) => module.default), {
  ssr: false
})

export default function WithYou() {
  return <Live2D />
}
