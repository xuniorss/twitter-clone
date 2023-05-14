import serverAuth from '@/libs/serverAuth'
import prisma from '@/libs/prismadb'

export const DELETE = async (
   req: Request,
   { params }: { params: { postId: string } }
) => {
   try {
      const { postId } = params

      const { currentUser } = await serverAuth()

      if (!postId || typeof postId !== 'string') throw new Error('Invalid ID')

      const post = await prisma.post.findUnique({
         where: { id: postId },
      })

      if (!post) throw new Error('Invalid ID')

      let updatedLikedIds = [...(post.likedIds || [])]

      updatedLikedIds = updatedLikedIds.filter(
         (likedId) => likedId !== currentUser.id
      )

      const updatedPost = await prisma.post.update({
         where: { id: postId },
         data: { likedIds: updatedLikedIds },
      })

      return new Response(JSON.stringify(updatedPost), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to remove like', { status: 400 })
   }
}
