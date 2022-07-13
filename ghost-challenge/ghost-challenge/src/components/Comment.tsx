import { Comment as CommentType, friendlyDate } from "../utils"
import "./Comment.css"

type Prop = CommentType

export const Comment = ({ author, text, upvotes, timestamp }: Prop) => {
  const friendlyTime = friendlyDate(timestamp)

  const handleUpvote = () => {
    console.log("upvote")
  }

  const handleReply = () => {
    console.log("reply")
  }

  return (
    <div className="comment">
      <div className="comment-img">
        <img
          src="${image}"
          alt="${author} profile picture"
        />
      </div>
      <div className="comment-details">
        <div className="comment-identity">
          <p className="name">${author}</p>
          <p className="time">・ ${friendlyTime}</p>
        </div>
        <p className="comment-text">${text}</p>
        <div className="comment-buttons">
          <a href="#" className="upvote-btn comment-btn" data-id="${id}">▲ Upvote ({upvotes})</a>
          <a href="#" role="button" className="reply-btn comment-btn">Reply</a>
        </div>
      </div>
    </div>
  )
}
