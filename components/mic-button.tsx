import { Mic, MicOff } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { cn } from '@/utils/ui'

interface Props {
  isListening: boolean
  disabled?: boolean
  onClick: () => void
}

const micButtonVariants = tv({
  base: 'flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white shadow-lg hover:opacity-80',
  variants: {
    disabled: {
      true: 'pointer-events-none cursor-default opacity-60'
    }
  },
  defaultVariants: {
    disabled: false
  }
})

export default function MicButton({ isListening, disabled = false, onClick }: Props) {
  return (
    <button className={cn(micButtonVariants({ disabled }))} onClick={onClick}>
      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </button>
  )
}
