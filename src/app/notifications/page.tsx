'use client'

import { Header } from '@/components/Header'
import { NotificationsFeed } from '@/components/NotificationsFeed'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Notifications() {
   const { data: session } = useSession()
   const route = useRouter()

   if (!session) return route.push('/')

   return (
      <>
         <Header label="Notificações" showBackArrow />
         <NotificationsFeed />
      </>
   )
}
