'use client'

import { useActionState } from 'react'
import { redirect } from 'next/navigation'
import {
  type FormState,
  signInWithCredentials,
  signInWithGithub,
  signInWithGoogle
} from '@/app/action/auth-action'
import { GithubAuthButton, GoogleAuthButton } from '@/components/button/o-auth-button'
import SignInButton from '@/components/button/sign-in-button'
import Card from '@/components/card'
import TextField from '@/components/form/text-field'
import { cn } from '@/utils/ui'

const initialState: FormState = {
  fields: {
    email: '',
    password: ''
  },
  result: false,
  message: ''
}

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const result = await signInWithCredentials(prevState, formData)

      if (result.result) {
        redirect('/')
      }

      return result
    },
    initialState
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">サインイン</h1>
        </div>
        <Card className="space-y-4 p-6">
          {/* メールアドレスとパスワードでサインイン */}
          <form action={formAction} className="space-y-4">
            <div>
              <TextField
                name="email"
                label="メールアドレス"
                type="email"
                defaultValue={state.fields.email}
              />
            </div>
            <div>
              <TextField name="password" label="パスワード" type="password" />
            </div>
            {state.message && <p className="text-sm text-red-500">{state.message}</p>}
            <div className={cn('mt-8', state.message && 'mt-2')}>
              <SignInButton type="submit" isPending={isPending} />
            </div>
          </form>
          {/* 区切り線 */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-sm text-gray-500">または</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* Googleでサインイン */}
          <form action={signInWithGoogle}>
            <GoogleAuthButton type="submit" />
          </form>
          {/* Githubでサインイン */}
          <form action={signInWithGithub}>
            <GithubAuthButton type="submit" />
          </form>
        </Card>
      </div>
    </div>
  )
}
