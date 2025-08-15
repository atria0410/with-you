import Image from 'next/image'
import NextLink from 'next/link'
import Card from '@/components/card'

interface Props {
  onClose: () => void
  onClickOutside?: () => void
}

export default function Credit({ onClose, onClickOutside }: Props) {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClickOutside?.()
    }
  }

  return (
    <div
      className="relative flex h-screen w-screen justify-center bg-gray-500/80"
      onClick={handleClickOutside}
    >
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <Card className="flex flex-col items-center space-y-10 px-10 py-4">
          <h1 className="text-md font-bold text-gray-800">クレジット</h1>
          <NextLink href="https://openai.com/" target="_blank">
            <Image src="/icons/openai.svg" alt="Live2D" width={200} height={200} />
          </NextLink>
          <NextLink href="https://www.live2d.com/" target="_blank">
            <Image src="/icons/live2d.svg" alt="Live2D" width={200} height={200} />
          </NextLink>
          <NextLink href="https://nijivoice.com/" target="_blank">
            <Image src="/icons/nijivoice.svg" alt="Live2D" width={200} height={200} />
          </NextLink>
          <div
            className="cursor-pointer text-center text-blue-500 hover:text-blue-600"
            onClick={onClose}
          >
            閉じる
          </div>
        </Card>
      </div>
    </div>
  )
}
