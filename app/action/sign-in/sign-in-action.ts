'use server'

import { signIn } from '@/auth'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().min(1, { message: 'メールアドレスを入力してください' }),
  password: z.string().min(1, { message: 'パスワードを入力してください' })
})

export type FormState = {
  fields: {
    email: string
  }
  errors: {
    email?: string
    password?: string
  }
  result: boolean
  message: string
}

/**
 * メールアドレスとパスワードでサインイン
 * @param _prevState 前の状態
 * @param formData フォームデータ
 * @returns フォームの状態
 */
export const signInWithCredentials = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    return {
      fields: {
        email
      },
      errors: {},
      result: true,
      message: 'ログインしました'
    }
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten()

      return {
        fields: {
          email: formData.get('email') as string
        },
        errors: {
          email: fieldErrors?.email?.[0],
          password: fieldErrors?.password?.[0]
        },
        result: false,
        message: '入力内容に誤りがあります'
      }
    }

    return {
      fields: {
        email: formData.get('email') as string
      },
      errors: {},
      result: false,
      message: 'メールアドレスまたはパスワードが間違っています'
    }
  }
}

/**
 * Googleでサインイン
 */
export const signInWithGoogle = async () => {
  await signIn('google', { redirectTo: '/' })
}

/**
 * Githubでサインイン
 */
export const signInWithGithub = async () => {
  await signIn('github', { redirectTo: '/' })
}
