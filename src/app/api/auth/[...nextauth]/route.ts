import prisma from '@/libs/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: 'credentials',
         credentials: {
            email: { label: 'email', type: 'text' },
            password: { label: 'password', type: 'password' },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password)
               throw new Error('Invalid credentials')

            const user = await prisma.user.findUnique({
               where: { email: credentials.email },
            })

            if (!user || !user.hashedPassword)
               throw new Error('Invalid credentials')

            const isCorrectPassword = await bcrypt.compare(
               credentials.password,
               user.hashedPassword
            )

            if (!isCorrectPassword) throw new Error('Invalid credentials')

            return user
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         return { ...token, ...user }
      },

      async session({ session, token }) {
         session.user = token as any
         return session
      },
   },
   debug: process.env.NODE_ENV === 'development',
   session: { strategy: 'jwt' },
   jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
   },
   secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
