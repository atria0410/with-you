import { tv } from 'tailwind-variants'
import { cn } from '@/utils/ui'

interface Props {
  children: React.ReactNode
  className?: string
}

const cardVariants = tv({
  base: 'rounded-md bg-white p-4 shadow-md',
  variants: {
    variant: {
      primary: 'bg-blue-500'
    }
  }
})

export default function Card({ children, className }: Props) {
  return <div className={cn(cardVariants(), className)}>{children}</div>
}
