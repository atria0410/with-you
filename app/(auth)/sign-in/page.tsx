import { signIn } from '@/auth'
import { GithubAuthButton, GoogleAuthButton } from '@/components/button/auth-button'
import Card from '@/components/card'

export default function SignInPage() {
  const signInWithGoogle = async () => {
    'use server'
    await signIn('google', { redirectTo: '/' })
  }

  const signInWithGithub = async () => {
    'use server'
    await signIn('github', { redirectTo: '/' })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">サインイン</h1>
        </div>
        <Card className="space-y-4 p-6">
          {/* 区切り線 */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-sm text-gray-500">または</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* OAuth認証ボタン */}
          <form action={signInWithGoogle}>
            <GoogleAuthButton type="submit" />
          </form>
          <form action={signInWithGithub}>
            <GithubAuthButton type="submit" />
          </form>
        </Card>
      </div>
    </div>
  )
}
