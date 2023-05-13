import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export const PATCH = async (req: Request) => {
   try {
      const { currentUser } = await serverAuth()

      const { name, username, bio, profileImage, coverImage } = await req.json()

      if (!name || !username) throw new Error('Missing fields')

      const updatedUser = await prisma.user.update({
         where: { id: currentUser.id },
         data: { name, username, bio, profileImage, coverImage },
      })

      return new Response(JSON.stringify(updatedUser), { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response('Failed to updated user', { status: 400 })
   }
}
