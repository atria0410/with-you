'use client'

import { useState } from 'react'
import { MessageSquareMore } from 'lucide-react'
import ChatLog from '@/components/chat-log'

export default function ChatLogButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {isOpen ? (
        <div className="absolute top-0 left-0 z-20">
          <ChatLog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageSquareMore className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
