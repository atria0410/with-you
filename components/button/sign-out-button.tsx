import { signOutAction } from '@/app/action/sign-out-action'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  return (
    <button
      className="flex cursor-pointer items-center gap-2 rounded-full border border-white bg-gray-500 p-2 text-white hover:bg-gray-600 active:scale-95"
      onClick={signOutAction}
    >
      <LogOut className="h-5 w-5" />
    </button>
  )
}
