import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export const POST = async (req: Request) => {
   try {
      const { postId } = await req.json()

      const { currentUser } = await serverAuth()

      if (!postId || typeof postId !== 'string') throw new Error('Invalid ID')

      const post = await prisma.post.findUnique({
         where: { id: postId },
      })

      if (!post) throw new Error('Invalid ID')

      let updatedLikedIds = [...(post.likedIds || [])]

      updatedLikedIds.push(currentUser.id)

      const updatedPost = await prisma.post.update({
         where: { id: postId },
         data: { likedIds: updatedLikedIds },
      })

      return new Response(JSON.stringify(updatedPost), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed ti add like', { status: 400 })
   }
}
