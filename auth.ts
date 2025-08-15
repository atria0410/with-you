import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

// NextAuthの型定義を拡張
declare module 'next-auth' {
  interface User {
    id: number
    email: string
    name: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const { email, password } = credentials

        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        })

        if (!user) {
          throw new Error('ユーザーが見つかりません')
        }

        const passwordsMatch = await bcrypt.compare(password as string, user.password)

        if (!passwordsMatch) {
          throw new Error('パスワードが一致しません')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    }),
    Google,
    GitHub
  ]
})
