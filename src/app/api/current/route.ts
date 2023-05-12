import serverAuth from '@/libs/serverAuth'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

export const GET = async (
   req: NextApiRequest,
   res: NextApiResponse<Session | null>
) => {
   try {
      const { currentUser } = await serverAuth()

      return new Response(JSON.stringify(currentUser), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to find user', { status: 500 })
   }
}
