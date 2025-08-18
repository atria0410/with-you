'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'

export type FormState = {
  result: boolean
  message: string
}

const verifySchema = z.object({
  email: z.string().email(),
  code: z.coerce.number().min(100000).max(999999)
})

export async function verifyAction(_prevState: FormState, formData: FormData) {
  try {
    const { email, code } = verifySchema.parse({
      email: formData.get('email'),
      code: formData.get('code')
    })

    // 認証コードを取得
    const authCode = await prisma.authCode.findUnique({
      where: {
        email,
        expiresAt: { gt: new Date() }
      }
    })

    if (!authCode || authCode.code !== code) {
      return {
        result: false,
        message: '認証コードが間違っています'
      }
    }

    // パスワードを更新
    await prisma.user.update({
      where: {
        email
      },
      data: {
        password: authCode.password
      }
    })

    // 認証コードを削除
    await prisma.authCode.delete({
      where: {
        email
      }
    })

    return {
      result: true,
      message: 'パスワードをリセットしました'
    }
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return {
        result: false,
        message: '入力内容に誤りがあります'
      }
    }

    return {
      result: false,
      message: 'システムエラーが発生しました'
    }
  }
}
