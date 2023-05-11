import { Layout } from '@/components/Layout'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

const roboto = Roboto({
   weight: '500',
   subsets: ['latin'],
   display: 'swap',
})

export const metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="pt-br">
         <body className={roboto.className}>
            <Layout>{children}</Layout>
         </body>
      </html>
   )
}
