'use client'

import { useState } from 'react'
import ChatLogButton from '@/components/button/chat-log-button'
import CreditButton from '@/components/button/credit-button'
import SignOutButton from '@/components/button/sign-out-button'
import ChatLog from '@/components/chat-log'
import Credit from '@/components/credit'

export default function Hud() {
  const [isChatLogOpen, setIsChatLogOpen] = useState(false)
  const [isCreditOpen, setIsCreditOpen] = useState(false)

  const isOpen = isChatLogOpen || isCreditOpen

  return (
    <div className="fixed top-0 left-0 z-10 h-full w-full">
      {!isOpen && (
        <div className="relative h-full w-full">
          <div className="absolute top-0 right-0 z-10 p-2">
            <SignOutButton />
          </div>
          <div className="absolute top-0 left-0 z-10 flex flex-col items-center gap-4 p-2">
            <ChatLogButton onClick={() => setIsChatLogOpen(true)} />
            <CreditButton onClick={() => setIsCreditOpen(true)} />
          </div>
        </div>
      )}

      <ChatLog isOpen={isChatLogOpen} onClose={() => setIsChatLogOpen(false)} />
      <Credit
        isOpen={isCreditOpen}
        onClose={() => setIsCreditOpen(false)}
        onClickOutside={() => setIsCreditOpen(false)}
      />
    </div>
  )
}
