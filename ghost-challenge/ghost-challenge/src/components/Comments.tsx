import { useEffect, useState } from "react"
import { Comment } from "."
import { useSocket } from "../context"
import { Comment as CommentType } from "../utils"


export const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>([])
  const socket = useSocket()

  useEffect(() => {
    socket.on("comment", (comment: CommentType) => {
      console.log(comment)
      setComments(comments => [...comments, comment])
    })
    socket.on("comments", (comments: CommentType[]) => {
      setComments(comments)
    })
    socket.on("upvote", (comment: CommentType) => {
      setComments(comments =>
        comments.map(c => (c.id === comment.id ? { ...c, upvotes: comment.upvotes } : c))
      )
    })
    socket.on("reply", ({ comment, parentId }: { comment: CommentType, parentId: number }) => {
      setComments(comments =>
        comments.map(c => {
          if (c.id === parentId) {
            if (!c.children) {
              return { ...c, children: [comment] }
            }
            return { ...c, children: [...c.children, comment] }
          }
          return c
        })
      )
    })

    return () => {
      socket.off("comment")
      socket.off("comments")
      socket.off("upvote")
      socket.off("reply")
    }
  }, [socket])

  return (
    <div className="comments-section">
      {comments.map(comment => (
        <Comment level={0} key={comment.id} {...comment} image="./avatar.jpb" />
      ))}
    </div>
  )
}
