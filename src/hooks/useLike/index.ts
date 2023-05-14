import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import useCurrentUser from '../useCurrentUser'
import useLoginModal from '../useLoginModal'
import usePost from '../usePost'
import usePosts from '../usePosts'

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
   const { data: currentUser } = useCurrentUser()
   const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
   const { mutate: mutateFetchedPosts } = usePosts(userId)

   const loginModal = useLoginModal()

   const hasLiked = useMemo(() => {
      const list = fetchedPost?.likedIds || ([] as Array<string>)

      return list.includes(currentUser?.id as string)
   }, [currentUser?.id, fetchedPost?.likedIds])

   const toggleLike = useCallback(async () => {
      if (!currentUser) return loginModal.onOpen()

      try {
         let request

         if (hasLiked) {
            request = () => fetch(`/api/like/${postId}`, { method: 'DELETE' })
         } else {
            request = () =>
               fetch('/api/like', {
                  method: 'POST',
                  body: JSON.stringify({ postId }),
               })
         }

         await request()

         mutateFetchedPost()
         mutateFetchedPosts()

         toast.success('Sucesso')
      } catch (error) {
         console.error(error)
         toast.error('Algo parece estar errado')
      }
   }, [
      currentUser,
      hasLiked,
      loginModal,
      mutateFetchedPost,
      mutateFetchedPosts,
      postId,
   ])

   return { hasLiked, toggleLike }
}

export default useLike
