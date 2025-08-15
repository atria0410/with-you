'use client'

import { useCallback, useEffect, useState } from 'react'
import { MessageSender } from '@prisma/client'
import Avatar from '@/components/avatar'
import Button from '@/components/button/button'

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

  const fetchChatLogs = useCallback(async () => {
    const response = await fetch(`/api/chat-log?limit=100`)
    const data = await response.json()
    setChatLogs(data)
  }, [])

  useEffect(() => {
    fetchChatLogs()
  }, [fetchChatLogs])

  return (
    <div className="flex h-screen w-screen justify-center bg-gray-500/80 px-2 py-6">
      <div className="flex w-full max-w-4xl flex-col justify-between gap-8">
        <div className="flex flex-col gap-4 overflow-y-auto px-2">
          {isOpen &&
            chatLogs.reverse().map((chatLog) => {
              const isUser = chatLog.sender === MessageSender.USER

              return (
                <div
                  key={chatLog.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${isUser ? 'justify-end' : 'flex-row items-end gap-2'}`}
                  >
                    {/* AIアバター（ユーザーの場合は非表示） */}
                    {!isUser && <Avatar src="/avatar/hiyori.jpg" />}

                    {/* メッセージバルーン */}
                    <div
                      className={`relative rounded-lg px-3 py-2 text-sm ${
                        isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                      }`}
                    >
                      <p className="break-words whitespace-pre-wrap">{chatLog.message}</p>

                      {/* 吹き出しの尻尾 */}
                      <div
                        className={`absolute bottom-0 h-3 w-3 ${
                          isUser
                            ? 'right-0 translate-x-1 bg-blue-500'
                            : 'left-0 -translate-x-1 bg-white'
                        }`}
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

        <div className="px-2">
          <Button onClick={onClose} className="w-full bg-gray-900">
            閉じる
          </Button>
        </div>
      </div>
    </div>
  )
}
