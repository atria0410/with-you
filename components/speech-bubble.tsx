import { AnimatePresence, motion } from 'motion/react'

interface Props {
  text: string
}

export default function SpeechBubble({ text = '' }: Props) {
  if (!text) return null

  return (
    <div className="relative inline-block max-w-md px-2">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className="relative rounded-lg bg-white px-4 py-3 text-black shadow-lg"
        >
          {/* 吹き出しの矢印（上向き） */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform">
            <div className="h-0 w-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-b-white border-l-transparent"></div>
          </div>

          {/* テキスト内容 */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="text-sm font-medium break-words whitespace-pre-wrap"
          >
            {text}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
