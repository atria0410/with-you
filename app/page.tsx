import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import ChatLogButton from '@/components/button/chat-log-button'
import SignOutButton from '@/components/button/sign-out-button'
import WithYou from '@/components/feature/with-you'
import Room from '@/components/room'

export default async function Home() {
  // サインインしていない場合はサインイン画面にリダイレクト
  const session = await auth()
  if (!session) return redirect('/sign-in')

  return (
    <Room>
      <div className="relative h-full w-full">
        <div className="absolute top-0 right-0 z-10 p-2">
          <SignOutButton />
        </div>
        <div className="absolute top-0 left-0 z-10 p-2">
          <ChatLogButton />
        </div>
        <div className="absolute top-0 left-0 z-5">
          <WithYou />
        </div>
      </div>
    </Room>
  )
}
