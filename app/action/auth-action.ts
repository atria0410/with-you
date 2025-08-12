'use server'

import { signIn } from '@/auth'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type FormState = {
  fields: {
    email: string
    password: string
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
export const signInWithCredentials = async (_prevState: FormState, formData: FormData) => {
  try {
    const { email, password } = credentialsSchema.parse({
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
        email,
        password
      },
      result: true,
      message: 'ログインしました'
    }
  } catch (error) {
    console.error(error)

    return {
      fields: {
        email: formData.get('email') as string,
        password: ''
      },
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
