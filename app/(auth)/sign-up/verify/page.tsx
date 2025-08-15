'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { type FormState, verifyAction } from '@/app/action/verify-action'
import { LucideCheck } from 'lucide-react'
import Button from '@/components/button/button'
import Card from '@/components/card'
import OtpField from '@/components/form/otp-field'

const initialState: FormState = {
  result: false,
  message: ''
}

export default function VerifyAuthCode() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  if (!email) redirect('/sign-up')

  const otpLength = 6
  const [code, setCode] = useState('')

  const [state, formAction, isPending] = useActionState(verifyAction, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-md">
        {state.result ? (
          <Card className="flex flex-col items-center justify-center space-y-4 px-4 py-6">
            <div className="flex items-center justify-center space-x-2">
              <LucideCheck className="h-6 w-6 text-green-500" />
              <p className="text-md text-center text-green-500">{state.message}</p>
            </div>

            <p className="text-md text-center text-gray-800">
              サインインページからログインしてください
            </p>

            <Link href="/sign-in" className="text-md text-blue-500">
              サインインページへ
            </Link>
          </Card>
        ) : (
          <div>
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-800">新規登録</h1>
            </div>
            <Card className="space-y-4 px-4 py-6">
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-800">{email} 宛に認証コードを送信しました。</p>
                <p className="mt-2 text-gray-500">
                  メッセージに記載された{otpLength}
                  桁の数字を入力してください。認証コードの有効期限は1時間です。
                </p>
              </div>

              <form action={formAction} className="mt-8 flex flex-col items-center space-y-4">
                <input type="hidden" name="email" value={email} />
                <div>
                  <OtpField name="code" value={code} length={otpLength} onChange={setCode} />
                </div>
                {state.message && <p className="text-red-500">{state.message}</p>}
                <div className="w-[270px]">
                  <Button
                    type="submit"
                    block
                    disabled={code.length !== otpLength}
                    isLoading={isPending}
                  >
                    認証
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
