'use client'

import usePosts from '@/hooks/usePosts'
import { PostItem } from './components/PostItem'

type PostsFeedProps = {
   userId?: string
}

export const PostFeed = ({ userId }: PostsFeedProps) => {
   const { data: posts = [] } = usePosts(userId)

   return (
      <>
         {posts.map((post) => (
            <PostItem key={post.id} userId={userId} data={post} />
         ))}
      </>
   )
}
