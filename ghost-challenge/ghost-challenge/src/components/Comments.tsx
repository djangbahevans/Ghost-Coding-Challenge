import { Comment } from "."
import { Comment as CommentType } from "../utils"

type Prop = {
  comments: CommentType[]
}

export const Comments = ({ comments }: Prop) => {
  return (
    <div className="comments-section">
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  )
}
