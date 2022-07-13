import './Search.css'

export const Search = () => {
  return (
    <div className="search-section">
      <img src="./avatar.jpg" alt="profile picture" />
      <input type="text" placeholder="What are your thoughts?" />
      <button className="btn btn-primary">Comment</button>
    </div>
  )
}
