import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import useCurrentUser from '../useCurrentUser'
import useLoginModal from '../useLoginModal'
import useUser from '../useUser'

const useFollow = (userId: string) => {
   const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
   const { mutate: mutateFetchedUser } = useUser(userId)

   const loginModel = useLoginModal()

   const isFollowing = useMemo(() => {
      const list = currentUser?.followingIds || ([] as Array<string>)

      return list.includes(userId)
   }, [currentUser?.followingIds, userId])

   const toggleFollow = useCallback(async () => {
      if (!currentUser) return loginModel.onOpen()

      try {
         let request

         if (isFollowing) {
            request = () =>
               fetch(`/api/follow/${userId}`, {
                  method: 'DELETE',
               })
         } else {
            request = () =>
               fetch('/api/follow', {
                  method: 'POST',
                  body: JSON.stringify({ userId }),
               })
         }

         await request()

         mutateCurrentUser()
         mutateFetchedUser()

         toast.success('Sucesso')
      } catch (error) {
         toast.error('Algo parece estar errado.')
      }
   }, [
      currentUser,
      isFollowing,
      loginModel,
      mutateCurrentUser,
      mutateFetchedUser,
      userId,
   ])

   return { isFollowing, toggleFollow }
}

export default useFollow
