'use client'

import { useState } from 'react'
import { Signature } from 'lucide-react'
import Credit from '@/components/credit'

export default function CreditButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {isOpen ? (
        <div className="absolute top-0 left-0 z-20">
          <Credit onClose={() => setIsOpen(false)} onClickOutside={() => setIsOpen(false)} />
        </div>
      ) : (
        <button
          className="flex cursor-pointer items-center gap-2 rounded-full border border-white bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white hover:opacity-80 active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Signature className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
