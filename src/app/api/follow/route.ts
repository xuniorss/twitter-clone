import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export const POST = async (req: Request) => {
   try {
      const { userId } = await req.json()
      const { currentUser } = await serverAuth()

      if (!userId || typeof userId !== 'string') throw new Error('Invalid ID')

      const user = await prisma.user.findUnique({ where: { id: userId } })

      if (!user) throw new Error('Invalid ID')

      let updatedFollowingIds = [...(user.followingIds || [])]

      updatedFollowingIds.push(userId)

      try {
         await prisma.notification.create({
            data: { body: 'Alguém segiu você!', userId },
         })

         await prisma.user.update({
            where: { id: userId },
            data: { hasNotification: true },
         })
      } catch (error) {
         console.error(error)
      }

      const updatedUser = await prisma.user.update({
         where: { id: currentUser.id },
         data: { followingIds: updatedFollowingIds },
      })

      return new Response(JSON.stringify(updatedUser), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to add follow', { status: 400 })
   }
}
