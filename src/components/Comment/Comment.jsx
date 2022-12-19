import "./Comment.scss"
const Comment = ({comment})=>{
    return  <div className="comment-container">
        
        <p className="comment-text">
            {comment.text}
        </p>
        <span className="createdAtComment">
           Posted : {comment.createdAt}
        </span>
    </div>
} 
export default Comment