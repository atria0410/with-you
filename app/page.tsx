import { redirect } from 'next/navigation'
import { auth } from '@/auth'
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
        <div>
          <WithYou />
        </div>
      </div>
    </Room>
  )
}
