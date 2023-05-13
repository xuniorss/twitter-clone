import { UserFollowersCountProps } from '@/@types/user'
import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

const useUser = (userId: string) => {
   const { data, error, isLoading, mutate } = useSWR<UserFollowersCountProps>(
      userId ? `/api/users/${userId}` : null,
      fetcher
   )

   return { data, error, isLoading, mutate }
}

export default useUser
