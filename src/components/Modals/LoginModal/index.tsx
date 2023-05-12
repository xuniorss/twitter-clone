'use client'

import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'

export const LoginModal = () => {
   const loginModal = useLoginModal()
   const registerModal = useRegisterModal()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const onToggle = useCallback(() => {
      if (isLoading) return

      loginModal.onClose()
      registerModal.onOpen()
   }, [isLoading, loginModal, registerModal])

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         await signIn('credentials', { email, password })

         loginModal.onClose()
      } catch (error) {
         console.error(error)
      } finally {
         setIsLoading(false)
      }
   }, [email, loginModal, password])

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
         />

         <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
         />
      </div>
   )

   const footerContent = (
      <div className="text-neutral-400 text-center mt-4">
         <p>
            Primeira vez usando o Twitter?
            <span
               onClick={onToggle}
               className="text-white cursor-pointer hover:underline"
            >
               {' '}
               Crie uma conta
            </span>
         </p>
      </div>
   )

   return (
      <Modal
         disabled={isLoading}
         isOpen={loginModal.isOpen}
         title="Conecte-se"
         actionLabel="Entrar"
         onClose={loginModal.onClose}
         onSubmit={onSubmit}
         body={bodyContent}
         footer={footerContent}
      />
   )
}
