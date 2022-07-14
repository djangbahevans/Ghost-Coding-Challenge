import { useEffect, useRef, useState } from "react"
import { useSocket } from "../context"
import { Comment } from "../utils"
import "./Reply.css"

type Prop = {
  id: number,
  user: string,
  onSubmit?: (comment: Omit<Comment, "id" | "timestamp" | "upvotes">) => void
}

export const Reply = ({ id, onSubmit, user }: Prop) => {
  const [value, setValue] = useState("")
  const socket = useSocket()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleClick = () => {
    const comment: Omit<Comment, "id" | "timestamp" | "upvotes"> = {
      author: user,
      text: value,
      image: "./thor.jpg"
    }
    socket.emit("reply", { comment, parentId: id })
    setValue("")
    onSubmit?.(comment)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick()
    }
  }

  return (
    <div className="reply-comment">
      <input
        type="text"
        placeholder="Reply"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <button
        className="btn btn-primary"
        onClick={handleClick}
      >Comment</button>
    </div>
  )
}
