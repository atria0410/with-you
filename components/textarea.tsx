import { useEffect, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import MicButton from '@/components/button/mic-button'
import SendButton from '@/components/send-button'

interface Props {
  placeholder?: string
  onSend: (message: string) => void
  maxRows?: number
  isLoading?: boolean
}

export default function Textarea({ placeholder, onSend, maxRows = 6, isLoading }: Props) {
  const [message, setMessage] = useState('')
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自動リサイズとスクロール処理
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      // 現在のスクロール位置を保存
      const wasAtBottom = textarea.scrollTop >= textarea.scrollHeight - textarea.clientHeight - 1

      // 高さをリセットして再計算
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const maxHeight = maxRows * 24 // 24px per row (approximate)
      const newHeight = Math.min(scrollHeight, maxHeight)
      textarea.style.height = newHeight + 'px'

      // maxHeightに達している場合、または以前に下にスクロールしていた場合は自動スクロール
      if (scrollHeight > maxHeight || wasAtBottom) {
        textarea.scrollTop = textarea.scrollHeight
      }
    }
  }, [message, maxRows])

  useEffect(() => {
    if (!listening && transcript) {
      onSend(transcript)
      resetTranscript()
    }
  }, [listening, transcript, resetTranscript, onSend])

  const handleSend = () => {
    if (message.trim() === '') return
    onSend(message.trim())
    setMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500">
        {/* メッセージ入力エリア */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={listening ? transcript : message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={listening}
            className="w-full resize-none overflow-y-auto bg-transparent px-3 py-3 pb-14 focus:outline-none"
            style={{
              minHeight: '60px',
              maxHeight: `${maxRows * 24}px`,
              scrollbarGutter: 'stable'
            }}
            rows={1}
          />
        </div>

        {/* 固定ボタンバー */}
        <div className="absolute right-0 bottom-0 left-0 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="text-xs text-gray-500">Shift + Enter で送信</div>

            <div className="flex items-center gap-2">
              <MicButton
                isListening={listening}
                disabled={isLoading}
                onClick={
                  listening
                    ? () => SpeechRecognition.stopListening()
                    : () => SpeechRecognition.startListening()
                }
              />
              <SendButton disabled={message.trim() === '' || isLoading} onClick={handleSend} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
