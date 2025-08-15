import { BeatLoader } from 'react-spinners'
import { tv } from 'tailwind-variants'
import { cn } from '@/utils/ui'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  block?: boolean
}

const buttonVariants = tv({
  base: 'h-[42px] cursor-pointer rounded-md bg-blue-500 p-2 text-white',
  variants: {
    disabled: {
      true: 'cursor-default opacity-50'
    },
    isLoading: {
      true: 'opacity-50'
    },
    block: {
      true: 'w-full'
    }
  }
})

export default function Button({
  children,
  disabled,
  className,
  isLoading,
  block,
  ...props
}: Props) {
  return (
    <button
      className={cn(buttonVariants({ disabled, isLoading, block }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <BeatLoader color="#fff" size={8} /> : children}
    </button>
  )
}
