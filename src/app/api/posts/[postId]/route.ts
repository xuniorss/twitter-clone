import prisma from '@/libs/prismadb'

export const GET = async (
   req: Request,
   { params }: { params: { postId: string } }
) => {
   try {
      const { postId } = params

      if (!postId || typeof postId !== 'string') throw new Error('Invalid ID')

      const post = await prisma.post.findUnique({
         where: { id: postId },
         include: {
            user: true,
            comments: {
               include: { user: true },
               orderBy: { createdAt: 'desc' },
            },
         },
      })

      return new Response(JSON.stringify(post), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to find post', { status: 400 })
   }
}
