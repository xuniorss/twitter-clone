import { CommentsProps } from '@/@types/posts'
import { CommentItem } from './components/CommentItem'

type CommentFeedProps = {
   comments?: Array<CommentsProps>
}

export const CommentFeed = ({ comments = [] }: CommentFeedProps) => {
   return (
      <>
         {comments.map((comment) => (
            <CommentItem key={comment.id} data={comment} />
         ))}
      </>
   )
}
