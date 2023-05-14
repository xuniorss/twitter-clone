import { UserProps } from '../user'

export type CommentsProps = {
   id: string
   body: string
   createdAt: Date
   updatedAt: Date
   userId: string
   postId: string

   user: UserProps
}

export type PostsProps = {
   id: string
   body: string
   createdAt: Date
   updatedAt: Date
   userId: string
   likedIds: string[]
   image: string

   user: UserProps
   comments: Array<CommentsProps>
}
