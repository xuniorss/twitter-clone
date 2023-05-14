import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
import { NotificationsProps } from '@/@types/posts'

const useNotifications = (userId?: string) => {
   const url = userId ? `/api/notifications/${userId}` : null
   const { data, error, isLoading, mutate } = useSWR<NotificationsProps[]>(
      url,
      fetcher
   )

   return { data, error, isLoading, mutate }
}

export default useNotifications
