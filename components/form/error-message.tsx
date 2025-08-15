import { CircleAlert } from 'lucide-react'
import { cn } from '@/utils/ui'

interface Props {
  errorMessage?: string
  hideError?: boolean
}

export default function ErrorMessage({ errorMessage, hideError }: Props) {
  return (
    <>
      {!hideError && (
        <div
          data-testid="error-message"
          className={cn(
            'mt-1 flex h-5 transform items-center gap-1 py-0.5 text-sm text-red-400',
            errorMessage
              ? 'translate-y-0 opacity-100 transition-all duration-250 ease-out'
              : '-translate-y-[50%] opacity-0'
          )}
        >
          <CircleAlert className="h-4 w-4" />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  )
}
