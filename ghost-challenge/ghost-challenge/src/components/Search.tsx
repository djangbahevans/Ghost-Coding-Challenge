import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../context'
import { Comment } from '../utils'
import './Search.css'

type Props = {
  user: string,
}

export const Search = ({ user }: Props) => {
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
      image: "./avatar.jpb"
    }
    socket.emit("comment", comment)
    setValue("")
  }

  return (
    <>
      <div className="search-section">
        <img
          src="./avatar.jpg"
          alt="profile" />
        <input
          type="text"
          placeholder="What are your thoughts?"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleClick() }}
          ref={inputRef}
        />
        <button className="btn btn-primary" onClick={handleClick}>Comment</button>
      </div>
      <hr />
    </>
  )
}
