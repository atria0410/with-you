import { BeatLoader } from 'react-spinners'

interface Props {
  isLoading: boolean
}

export default function Loading({ isLoading }: Props) {
  if (!isLoading) return null

  return (
    <div className="fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-lg bg-white px-8 py-4 shadow-lg">
      <div className="flex flex-col items-center gap-2">
        <BeatLoader color="#36d7b7" />
        <p className="text-sm text-gray-500">解析中...</p>
      </div>
    </div>
  )
}
