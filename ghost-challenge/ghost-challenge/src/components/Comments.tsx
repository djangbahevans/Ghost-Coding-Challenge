import { useEffect, useState } from "react"
import { Comment } from "."
import { useSocket } from "../context"
import { Comment as CommentType } from "../utils"


export const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>([])
  const socket = useSocket()

  useEffect(() => {
    socket.on("comment", (comment: CommentType) => {
      setComments(comments => [...comments, comment])
    })
    socket.on("comments", (comments: CommentType[]) => {
      setComments(comments)
    })
    socket.on("upvote", ({ id, upvotes }: { id: number, upvotes: number }) => {
      // make a copy of the comments array
      const newComments = [...comments]
      console.log(comments)
      console.log(newComments)
      // find the comment or the child comment with the given id
      const updateComment = (comment: CommentType) => {
        if (comment.id === id) {
          comment.upvotes = upvotes;
        }
        if (comment.children) {
          comment.children.forEach(updateComment);
        }
      }
      newComments.forEach(updateComment);
      // set the new comments array
      setComments(newComments);
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
  }, [socket, comments])

  return (
    <div className="comments-section">
      {comments.map(comment => (
        <Comment level={0} key={comment.id} {...comment} image="./avatar.jpb" />
      ))}
    </div>
  )
}
