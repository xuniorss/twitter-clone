import serverAuth from '@/libs/serverAuth'
import prisma from '@/libs/prismadb'

export const POST = async (req: Request) => {
   try {
      const { currentUser } = await serverAuth()
      const { body } = await req.json()

      const post = await prisma.post.create({
         data: { body, userId: currentUser.id },
      })

      return new Response(JSON.stringify(post), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to create post', { status: 400 })
   }
}

export const GET = async (req: Request, res: Response) => {
   try {
      const userId = new URL(req.url).searchParams.get('userId')

      let posts

      if (userId && typeof userId === 'string') {
         posts = await prisma.post.findMany({
            where: { userId },
            include: { user: true, comments: true },
            orderBy: { createdAt: 'desc' },
         })
      } else {
         posts = await prisma.post.findMany({
            include: { user: true, comments: true },
            orderBy: { createdAt: 'desc' },
         })
      }

      return new Response(JSON.stringify(posts), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to get post', { status: 400 })
   }
}
