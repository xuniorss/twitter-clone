'use client'

import { IconType } from 'react-icons'
import { BiLogOut } from 'react-icons/bi'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { SidebarItem } from './components/SidebarItem'

import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import { SidebarLogo } from './components/SidebarLogo'
import { SidebarTweetButton } from './components/SidebarTweetButton'

type SidebarItems = {
   label: string
   href: string
   icon: IconType
   auth: boolean
}

const items: Array<SidebarItems> = [
   { label: 'Página inicial', href: '/', icon: BsHouseFill, auth: false },
   {
      label: 'Notificações',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
   },
   { label: 'Perfil', href: '/users/123', icon: FaUser, auth: true },
]

export const Sidebar = () => {
   const { data: currentUser } = useCurrentUser()

   return (
      <div className="col-span-1 h-full pr-4 md:pr-6">
         <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[230px]">
               <SidebarLogo />
               {items.map((item) => (
                  <SidebarItem
                     key={item.href}
                     href={item.href}
                     label={item.label}
                     icon={item.icon}
                     auth={item.auth}
                  />
               ))}
               {currentUser && (
                  <SidebarItem
                     onClick={() => signOut()}
                     icon={BiLogOut}
                     label="Sair"
                  />
               )}
               <SidebarTweetButton />
            </div>
         </div>
      </div>
   )
}
