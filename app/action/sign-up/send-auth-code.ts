'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const sendAuthCodeSchema = z
  .object({
    email: z.string().email({ message: 'メールアドレスの形式が不正です' }),
    password: z.string().min(8, { message: 'パスワードは8文字以上で入力してください' }),
    passwordConfirmation: z.string().min(1, { message: 'パスワード（確認）を入力してください' })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation']
  })
  .refine(async (data) => !(await userAlreadyExists(data.email)), {
    message: 'このメールアドレスは既に使用されています',
    path: ['email']
  })

export type FormState = {
  fields: {
    email: string
    password: string
    passwordConfirmation: string
  }
  errors: {
    email?: string
    password?: string
    passwordConfirmation?: string
  }
  result: boolean
  message: string
}

/**
 * 認証コードを送信
 * @param _prevState 前の状態
 * @param formData フォームデータ
 * @returns フォームの状態
 */
export async function sendAuthCode(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const { email, password, passwordConfirmation } = await sendAuthCodeSchema.parseAsync({
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirmation: formData.get('passwordConfirmation')
    })

    // 認証コードを生成
    const authCode = await generateAuthCode()

    // 認証コードをDBに保存
    await upsertAuthCode(email, password, authCode)

    // 認証コードをメール送信
    await sendEmail(email, authCode)

    return {
      fields: {
        email,
        password,
        passwordConfirmation
      },
      errors: {},
      result: true,
      message: '認証コードを送信しました'
    }
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten()

      return {
        fields: {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          passwordConfirmation: formData.get('passwordConfirmation') as string
        },
        errors: {
          email: fieldErrors?.email?.[0],
          password: fieldErrors?.password?.[0],
          passwordConfirmation: fieldErrors?.passwordConfirmation?.[0]
        },
        result: false,
        message: '入力内容に誤りがあります'
      }
    }

    return {
      fields: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        passwordConfirmation: formData.get('passwordConfirmation') as string
      },
      errors: {},
      result: false,
      message: 'システムエラーが発生しました'
    }
  }
}

/**
 * ユーザーが既に存在するかどうかを確認
 * @param email メールアドレス
 * @returns ユーザーが既に存在するかどうか
 */
async function userAlreadyExists(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user !== null
}

/**
 * 認証コードを生成
 * @returns 認証コード
 */
export async function generateAuthCode() {
  return Math.floor(100000 + Math.random() * 900000)
}

/**
 * 認証コードを保存
 * @param email メールアドレス
 * @param code 認証コード
 */
export async function upsertAuthCode(email: string, password: string, code: number) {
  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.authCode.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
    },
    create: {
      email,
      password: hashedPassword,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60)
    }
  })
}

/**
 * メールを送信
 * @param email 送信先メールアドレス
 */
async function sendEmail(email: string, authCode: number) {
  const host = process.env.EMAIL_HOST
  const port = Number(process.env.EMAIL_PORT)
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user,
      pass
    }
  })

  const toHostMailData = {
    from: email,
    to: email,
    subject: '【認証コード】With You',
    text: `認証コードは ${authCode} です。`
  }

  await transporter.sendMail(toHostMailData)
}
