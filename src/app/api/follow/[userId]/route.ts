import serverAuth from '@/libs/serverAuth'
import prisma from '@/libs/prismadb'

export const DELETE = async (
   req: Request,
   { params }: { params: { userId: string } }
) => {
   try {
      const { userId } = params
      const { currentUser } = await serverAuth()

      if (!userId || typeof userId !== 'string') throw new Error('Invalid ID')

      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) throw new Error('Invalid ID')

      let updatedFollowingIds = [...(user.followingIds || [])]

      updatedFollowingIds = updatedFollowingIds.filter(
         (followingId) => followingId !== userId
      )

      const updatedUser = await prisma.user.update({
         where: { id: currentUser.id },
         data: { followingIds: updatedFollowingIds },
      })

      return new Response(JSON.stringify(updatedUser), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to remove follow', { status: 400 })
   }
}
