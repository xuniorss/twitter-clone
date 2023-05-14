import serverAuth from '@/libs/serverAuth'
import prisma from '@/libs/prismadb'

export const POST = async (
   req: Request
   // { params }: { params: { postId: string } }
) => {
   try {
      const { currentUser } = await serverAuth()
      const { body } = await req.json()
      const postId = new URL(req.url).searchParams.get('postId')

      if (!postId || typeof postId !== 'string') throw new Error('Invalid ID')

      const comment = await prisma.comment.create({
         data: { body, userId: currentUser.id, postId },
      })

      return new Response(JSON.stringify(comment), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to comment', { status: 400 })
   }
}
