
const CommentCard = ({comment, username}) => {
    return (
      <div className="comCard">
        <h5>{username}</h5>
        <p>{comment}</p>
        <hr />
      </div>
  
    )
  }
  
  export default CommentCard
  