import prisma from '@/libs/prismadb'

export const GET = async (
   req: Request,
   { params }: { params: { userId: string } }
) => {
   try {
      const { userId } = params

      if (!userId || typeof userId !== 'string') throw new Error('Invalid ID')

      const notifications = await prisma.notification.findMany({
         where: { userId },
         orderBy: { createdAt: 'desc' },
      })

      await prisma.user.update({
         where: { id: userId },
         data: { hasNotification: false },
      })

      return new Response(JSON.stringify(notifications), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Fail to find notifications', { status: 400 })
   }
}
