import prisma from '@/libs/prismadb'

export const GET = async (
   req: Request,
   { params }: { params: { userId: string } }
) => {
   try {
      const { userId } = params

      if (!userId || typeof userId !== 'string') {
         throw new Error('Invalid ID')
      }

      const existingUser = await prisma.user.findUnique({
         where: { id: userId },
      })

      const followersCount = await prisma.user.count({
         where: {
            followingIds: { has: userId },
         },
      })

      const data = { ...existingUser, followersCount }

      return new Response(JSON.stringify(data), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to find user data', { status: 400 })
   }
}
