import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
   try {
      const users = await prisma.user.findMany({
         orderBy: {
            createdAt: 'desc',
         },
      })

      return new Response(JSON.stringify(users), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to find users', { status: 400 })
   }
}
