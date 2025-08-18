'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { type FormState, sendAuthCode } from '@/app/action/forgot-password/send-auth-code'
import Button from '@/components/button/button'
import Card from '@/components/card'
import TextField from '@/components/form/text-field'

const initialState: FormState = {
  fields: {
    email: '',
    password: '',
    passwordConfirmation: ''
  },
  errors: {},
  result: false,
  message: ''
}

export default function SignUpPage() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const result = await sendAuthCode(prevState, formData)

      if (result.result) {
        router.push(`/forgot-password/verify?email=${encodeURIComponent(result.fields.email)}`)
      }

      return result
    },
    initialState
  )

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">パスワードを再設定</h1>
        </div>
        <Card className="space-y-4 p-6">
          <form action={formAction} className="space-y-2">
            {state.message && (
              <p className="mb-4 text-center text-sm text-red-500">{state.message}</p>
            )}
            <div>
              <TextField
                name="email"
                label="メールアドレス"
                type="email"
                defaultValue={state.fields.email}
                errorMessage={state.errors?.email}
              />
            </div>
            <div>
              <TextField
                name="password"
                label="パスワード"
                type="password"
                defaultValue={state.fields.password}
                errorMessage={state.errors?.password}
              />
            </div>
            <div>
              <TextField
                name="passwordConfirmation"
                label="パスワード確認"
                type="password"
                defaultValue={state.fields.passwordConfirmation}
                errorMessage={state.errors?.passwordConfirmation}
              />
            </div>
            <div className="mt-6">
              <Button type="submit" block isLoading={isPending}>
                認証コードを送信
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
