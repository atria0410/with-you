import { Signature } from 'lucide-react'

interface Props {
  onClick: () => void
}

export default function CreditButton({ onClick }: Props) {
  return (
    <button
      className="flex cursor-pointer items-center gap-2 rounded-full border border-white bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white hover:opacity-80 active:scale-95"
      onClick={onClick}
    >
      <Signature className="h-5 w-5" />
    </button>
  )
}
