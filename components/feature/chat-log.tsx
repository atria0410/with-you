'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageSender } from '@prisma/client'
import Avatar from '@/components/avatar'
import Button from '@/components/button/button'
import Overlay from '@/components/overlay'
import { cn } from '@/utils/ui'

interface ChatLog {
  id: string
  message: string
  sender: MessageSender
  createdAt: Date
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ChatLog({ isOpen, onClose }: Props) {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  // チャットログを取得
  const fetchChatLogs = useCallback(async () => {
    if (!isOpen) return
    const response = await fetch(`/api/chat-log?limit=100`)
    const data = await response.json()
    setChatLogs(data)
  }, [isOpen])

  useEffect(() => {
    fetchChatLogs()
  }, [fetchChatLogs])

  // スクロールを最下部へ
  const scrollToBottom = useCallback(() => {
    if (chatLogs.length === 0) return
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [chatLogs])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return isOpen ? (
    <Overlay className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-4xl flex-col justify-between gap-8 px-2 py-6">
        <div ref={scrollRef} className="flex flex-col gap-4 overflow-y-auto px-2">
          {chatLogs.map((chatLog) => {
            const isUser = chatLog.sender === MessageSender.USER

            return (
              <div
                key={chatLog.id}
                className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'flex max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl',
                    isUser ? 'justify-end' : 'flex-row items-end gap-2'
                  )}
                >
                  {!isUser && <Avatar src="/avatar/hiyori.jpg" />}

                  <div
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-sm',
                      isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                    )}
                  >
                    <p className="break-words whitespace-pre-wrap">{chatLog.message}</p>

                    <div
                      className={cn(
                        'absolute bottom-0 h-3 w-3',
                        isUser
                          ? 'right-0 translate-x-1 bg-blue-500'
                          : 'left-0 -translate-x-1 bg-white'
                      )}
                      style={{
                        clipPath: isUser
                          ? 'polygon(0 0, 100% 0, 0 100%)'
                          : 'polygon(100% 0, 100% 100%, 0 0)'
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button onClick={onClose} className="bg-gray-700 px-8">
            閉じる
          </Button>
        </div>
      </div>
    </Overlay>
  ) : null
}
