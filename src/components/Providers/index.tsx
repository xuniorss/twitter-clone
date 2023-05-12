'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

type ProviderProps = {
   children: ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
   return (
      <SessionProvider>
         <Toaster />
         {children}
      </SessionProvider>
   )
}
