'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ChatLogButton from '@/components/button/chat-log-button'
import CreditButton from '@/components/button/credit-button'
import SignOutButton from '@/components/button/sign-out-button'
import ChatLog from '@/components/feature/chat-log'
import Credit from '@/components/feature/credit'

const Live2D = dynamic(() => import('@/components/live2d').then((module) => module.default), {
  ssr: false
})

export default function WithYou() {
  const [isChatLogOpen, setIsChatLogOpen] = useState(false)
  const [isCreditOpen, setIsCreditOpen] = useState(false)
  const isOpen = isChatLogOpen || isCreditOpen

  return (
    <div className="relative h-full w-full">
      <Live2D />

      {!isOpen && (
        <>
          <div className="absolute top-0 right-0 z-10 p-2">
            <SignOutButton />
          </div>
          <div className="absolute top-0 left-0 z-10 flex flex-col items-center gap-4 p-2">
            <ChatLogButton onClick={() => setIsChatLogOpen(true)} />
            <CreditButton onClick={() => setIsCreditOpen(true)} />
          </div>
        </>
      )}

      {/* チャットログ */}
      <ChatLog isOpen={isChatLogOpen} onClose={() => setIsChatLogOpen(false)} />

      {/* クレジット */}
      <Credit
        isOpen={isCreditOpen}
        onClose={() => setIsCreditOpen(false)}
        onClickOutside={() => setIsCreditOpen(false)}
      />
    </div>
  )
}
