import { IconType } from 'react-icons'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { SidebarItem } from './components/SidebarItem'
import { BiLogOut } from 'react-icons/bi'

import { SidebarLogo } from './components/SidebarLogo'
import { SidebarTweetButton } from './components/SidebarTweetButton'

type SidebarItems = {
   label: string
   href: string
   icon: IconType
}

const items: Array<SidebarItems> = [
   { label: 'Página inicial', href: '/', icon: BsHouseFill },
   { label: 'Notificações', href: '/notifications', icon: BsBellFill },
   { label: 'Perfil', href: '/users/123', icon: FaUser },
]

export const Sidebar = () => {
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
                  />
               ))}
               <SidebarItem onClick={() => {}} icon={BiLogOut} label="Sair" />
               <SidebarTweetButton />
            </div>
         </div>
      </div>
   )
}
