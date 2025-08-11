import { Send } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { cn } from '@/utils/ui'

interface Props {
  disabled?: boolean
  onClick: () => void
}

const sendButtonVariants = tv({
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

export default function SendButton({ disabled = false, onClick }: Props) {
  return (
    <button className={cn(sendButtonVariants({ disabled }))} onClick={onClick}>
      <Send className="h-5 w-5" />
    </button>
  )
}
