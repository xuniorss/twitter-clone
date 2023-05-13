'use client'

import { Button } from '@/components/Button'
import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { BiCalendar } from 'react-icons/bi'

type UserBioProps = {
   userId: string
}

export const UserBio = ({ userId }: UserBioProps) => {
   const { data: currentUser } = useCurrentUser()
   const { data: fetchedUser } = useUser(userId)

   const createdAt = useMemo(() => {
      if (!fetchedUser?.createdAt) return null

      return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
   }, [fetchedUser.createdAt])

   return (
      <div className="border-b-[1px] border-neutral-800 pb-4">
         <div className="flex justify-end p-2">
            {currentUser?.id === userId && (
               <Button label="Editar" onClick={() => {}} secondary />
            )}

            {currentUser?.id !== userId && (
               <Button label="Seguir" onClick={() => {}} secondary />
            )}
         </div>
         <div className="mt-8 px-4">
            <div className="flex flex-col">
               <p className="text-white text-2xl font-semibold">
                  {fetchedUser?.name}
               </p>
               <p className="text-md text-neutral-500">
                  @{fetchedUser?.username}
               </p>
            </div>
            <div className="flex flex-col mt-4">
               <p className="text-white">{fetchedUser?.bio}</p>
               <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                  <BiCalendar size={24} />
                  <p>Ingressou em {createdAt}</p>
               </div>
            </div>
            <div className="flex flex-row item-center mt-4 gap-6">
               <div className="flex flex-row items-center gap-1">
                  <p className="text-white">
                     {fetchedUser?.followingIds?.length}
                  </p>
                  <p className="text-neutral-500">Seguindo</p>
               </div>
               <div className="flex flex-row items-center gap-1">
                  <p className="text-white">
                     {fetchedUser?.followersCount || 0}
                  </p>
                  <p className="text-neutral-500">Seguidores</p>
               </div>
            </div>
         </div>
      </div>
   )
}