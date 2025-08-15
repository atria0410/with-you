import { signOut } from '@/auth'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const handleSignOut = async () => {
    'use server'
    await signOut({ redirectTo: '/sign-in' })
  }

  return (
    <form action={handleSignOut}>
      <button
        className="flex cursor-pointer items-center gap-2 rounded-full border border-white bg-gray-500 p-2 text-white hover:bg-gray-600 active:scale-95"
        type="submit"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </form>
  )
}
