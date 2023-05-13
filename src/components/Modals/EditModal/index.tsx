'use client'

import { ImageUpload } from '@/components/ImageUpload'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal'
import useUser from '@/hooks/useUser'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export const EditModal = () => {
   const [profileImage, setProfileImage] = useState<string | undefined>('')
   const [coverImage, setCoverImage] = useState<string | undefined>('')
   const [name, setName] = useState<string | undefined>('')
   const [username, setUsername] = useState<string | undefined>('')
   const [bio, setBio] = useState<string | undefined>('')

   const [isLoading, setIsLoading] = useState(false)

   const { data: currentUser } = useCurrentUser()
   const { mutate: mutateFetchedUser } = useUser(String(currentUser?.id))
   const editModal = useEditModal()

   useEffect(() => {
      setProfileImage(currentUser?.profileImage)
      setCoverImage(currentUser?.coverImage)
      setName(currentUser?.name)
      setUsername(currentUser?.username)
      setBio(currentUser?.bio)
   }, [
      currentUser?.bio,
      currentUser?.coverImage,
      currentUser?.name,
      currentUser?.profileImage,
      currentUser?.username,
   ])

   const onSubmit = useCallback(async () => {
      try {
         setIsLoading(true)

         const response = await fetch('/api/edit', {
            method: 'PATCH',
            body: JSON.stringify({
               name,
               username,
               bio,
               profileImage,
               coverImage,
            }),
         })

         if (response.ok) {
            mutateFetchedUser()

            toast.success('Atualizado')

            editModal.onClose()
         }
      } catch (error) {
         console.error(error)
         toast.error('Algo parece estar errado.')
      } finally {
         setIsLoading(false)
      }
   }, [
      bio,
      coverImage,
      editModal,
      mutateFetchedUser,
      name,
      profileImage,
      username,
   ])

   const bodyContent = (
      <div className="flex flex-col gap-4">
         <ImageUpload
            value={profileImage}
            disabled={isLoading}
            onChange={(image) => setProfileImage(image)}
            label="Alterar imagem de perfil"
         />

         <ImageUpload
            value={coverImage}
            disabled={isLoading}
            onChange={(image) => setCoverImage(image)}
            label="Alterar banner do perfil"
         />
         <Input
            placeholder="Nome"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
         />

         <Input
            placeholder="Nome de usuário"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
         />

         <Input
            placeholder="Bio"
            type="text"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
         />
      </div>
   )

   return (
      <Modal
         disabled={isLoading}
         isOpen={editModal.isOpen}
         title="Editar seu perfil"
         actionLabel="Salvar"
         onClose={editModal.onClose}
         onSubmit={onSubmit}
         body={bodyContent}
      />
   )
}
