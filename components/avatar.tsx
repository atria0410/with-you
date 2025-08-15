import Image from 'next/image'

interface Props {
  src: string
}

export default function Avatar({ src }: Props) {
  return (
    <div
      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold`}
    >
      <Image src={src} alt="avatar" width={32} height={32} className="rounded-full bg-gray-400" />
    </div>
  )
}
