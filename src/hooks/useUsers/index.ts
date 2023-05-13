import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
import { UserProps } from '@/@types/user'

const useUsers = () => {
   const { data, error, isLoading, mutate } = useSWR<UserProps[]>(
      '/api/users',
      fetcher
   )

   return { data, error, isLoading, mutate }
}

export default useUsers
