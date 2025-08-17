import { Righteous } from 'next/font/google'
import Image from 'next/image'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin']
})

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Image src="/images/logo.png" alt="logo" width={60} height={60} />
      <h1
        className={`${righteous.className} text-4xl font-bold tracking-wide text-gray-700 antialiased`}
      >
        With You
      </h1>
    </div>
  )
}
