import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Hud from '@/components/feature/hud'
import WithYou from '@/components/feature/with-you'
import Room from '@/components/room'

export default async function Home() {
  // サインインしていない場合はサインイン画面にリダイレクト
  const session = await auth()
  if (!session) return redirect('/sign-in')

  return (
    <Room>
      <WithYou />
      <Hud />
    </Room>
  )
}
