'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import usePost from '@/hooks/usePost'
import usePosts from '@/hooks/usePosts'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Avatar } from '../Avatar'
import { Button } from '../Button'

type FormProps = {
   placeholder: string
   isComment?: boolean
   postId?: string
}

export const Form = ({ placeholder, isComment, postId }: FormProps) => {
   const [body, setBody] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const registerModal = useRegisterModal()
   const loginModal = useLoginModal()

   const { data: currentUser } = useCurrentUser()
   const { mutate: mutatePosts } = usePosts()
   const { mutate: mutatePost } = usePost(String(postId))

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts'

         const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ body }),
         })

         if (response.ok) {
            toast.success('Tweet Criado.')

            setBody('')
            mutatePosts()
            mutatePost()
         }
      } catch (error) {
         console.error(error)
         toast.error('Alguma coisa deu errado.')
      } finally {
         setIsLoading(false)
      }
   }, [body, isComment, mutatePosts, postId, mutatePost])

   return (
      <div className="border-b-[1px] border-neutral-800 px-5 py-2">
         {currentUser && (
            <div className="flex flex-row gap-4">
               <div>
                  <Avatar userId={currentUser.id} />
               </div>
               <div className="w-full">
                  <textarea
                     disabled={isLoading}
                     onChange={(e) => setBody(e.target.value)}
                     value={body}
                     className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
                     placeholder={placeholder}
                  />

                  <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

                  <div className="mt-4 flex flex-row justify-end">
                     <Button
                        disabled={isLoading || !body}
                        onClick={onSubmit}
                        label="Tweet"
                     />
                  </div>
               </div>
            </div>
         )}

         {!currentUser && (
            <div className="py-8">
               <h1 className="text-white text-2xl text-center mb-4 font-bold">
                  Bem-vindo(a) ao Twitter
               </h1>
               <div className="flex flex-row items-center justify-center gap-4">
                  <Button label="Acessar" onClick={loginModal.onOpen} />
                  <Button
                     label="Cadastrar-se"
                     onClick={registerModal.onOpen}
                     secondary
                  />
               </div>
            </div>
         )}
      </div>
   )
}
