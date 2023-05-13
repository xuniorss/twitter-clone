import { UserProps } from '@/@types/user'
import fetcher from '@/libs/fetcher'
import useSWR from 'swr'

const useCurrentUser = () => {
   const { data, error, isLoading, mutate } = useSWR<UserProps>(
      '/api/current',
      fetcher
   )

   return { data, error, isLoading, mutate }
}

export default useCurrentUser
