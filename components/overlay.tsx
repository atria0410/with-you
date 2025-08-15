import { cn } from '@/utils/ui'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function Overlay({ children, className, onClick }: Props) {
  return (
    <div
      className={cn('fixed top-0 left-0 h-screen w-screen bg-gray-500/80', className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
