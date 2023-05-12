import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
   // if (req.method !== 'POST') return res.status(405).end()

   const { email, username, name, password } = await req.json()
   try {
      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await prisma.user.create({
         data: { email, username, name, hashedPassword },
      })

      return new Response(JSON.stringify(user), { status: 201 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to create user', { status: 500 })
   }
}
