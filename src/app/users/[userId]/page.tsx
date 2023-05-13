'use client'

import { Header } from '@/components/Header'
import { PostFeed } from '@/components/posts/PostFeed'
import { UserBio } from '@/components/Users/UserBio'
import { UserHero } from '@/components/Users/UserHero'
import useUser from '@/hooks/useUser'
import { useParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

type ParamsProps = {
   userId: string
}

export default function UserView() {
   const params = useParams() as ParamsProps

   const { data: fetchedUser, isLoading } = useUser(params.userId)

   if (isLoading || !fetchedUser) {
      return (
         <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
         </div>
      )
   }

   return (
      <>
         <Header showBackArrow label={fetchedUser?.name} />
         <UserHero userId={params.userId} />
         <UserBio userId={params.userId} />
         <PostFeed userId={params.userId} />
      </>
   )
}
