'use client'

import { Form } from '@/components/Form'
import { Header } from '@/components/Header'
import { PostItem } from '@/components/posts/PostFeed/components/PostItem'
import usePost from '@/hooks/usePost'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

export default function PostView() {
   const params = useParams()
   const { postId } = params

   const { data: fetchedPost, isLoading } = usePost(postId)

   if (isLoading || !fetchedPost) {
      return (
         <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
         </div>
      )
   }

   return (
      <>
         <Header label="Tweet" showBackArrow />
         <PostItem data={fetchedPost} />
         <Form postId={postId} isComment placeholder="Tweet sua resposta" />
      </>
   )
}
