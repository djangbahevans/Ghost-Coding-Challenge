import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import { useSocket } from "../context"
import { Comment as CommentType } from "../utils"
import "./Comment.css"
import { Reply } from "./Reply"

type Prop = CommentType & { level: number, style?: React.CSSProperties }

export const Comment = ({ author, text, upvotes, timestamp, image, id, level, style = {}, children = [] }: Prop) => {
  const friendlyTime = formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  const socket = useSocket()
  const [showReply, setShowReply] = useState(false)

  const handleUpvote = () => {
    socket.emit("upvote", id)
  }

  const handleReply = () => {
    setShowReply(!showReply)
  }

  useEffect(() => {

  }, [])

  return (
    <div style={style} className="comment">
      <div className="comment-img">
        <img
          src={`${image}`}
          alt={`${author} profile`}
        />
      </div>
      <div className="comment-details">
        <div className="comment-identity">
          <p className="name">{author}</p>
          <p className="time">・ {friendlyTime}</p>
        </div>
        <p className="comment-text">{text}</p>
        <div className="comment-buttons">
          <button className="upvote-btn btn comment-btn" onClick={handleUpvote}>▲ Upvote ({upvotes})</button>
          {level === 0 && <button className="reply-btn btn comment-btn" onClick={handleReply}>Reply</button>}
        </div>
        {showReply && <Reply id={id} onSubmit={handleReply} />}
        {children.map((child, index) => (
          <Comment style={{ marginBottom: 10 }} key={index} {...child} level={level + 1} />
        ))}
      </div>
    </div>
  )
}
