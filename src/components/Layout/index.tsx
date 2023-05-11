import { ReactNode } from 'react'
import { FollowBar } from './components/FollowBar'
import { Sidebar } from './components/Sidebar'

type LayoutProps = {
   children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
   return (
      <div className="h-screen bg-black">
         <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
               <Sidebar />
               <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                  {children}
               </div>
               <FollowBar />
            </div>
         </div>
      </div>
   )
}
