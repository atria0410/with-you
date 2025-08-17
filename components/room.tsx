import dayjs from '@/lib/dayjs'
import { tv } from 'tailwind-variants'

interface Props {
  children: React.ReactNode
}

const roomVariants = tv({
  base: 'h-svh w-full bg-cover bg-center',
  variants: {
    time: {
      day: 'bg-[url(/images/room-day.jpg)]',
      evening: 'bg-[url(/images/room-evening.jpg)]',
      night: 'bg-[url(/images/room-night.jpg)]',
      midnight: 'bg-[url(/images/room-midnight.jpg)]'
    }
  },
  defaultVariants: {
    time: 'day'
  }
})

type Time = 'day' | 'evening' | 'night' | 'midnight' | undefined

export default function Room({ children }: Props) {
  const hour = dayjs().hour()
  let time: Time

  if (hour >= 6 && hour < 17) {
    time = 'day'
  } else if (hour >= 17 && hour < 19) {
    time = 'evening'
  } else if (hour >= 19 && hour < 23) {
    time = 'night'
  } else {
    time = 'midnight'
  }

  return <div className={roomVariants({ time })}>{children}</div>
}
