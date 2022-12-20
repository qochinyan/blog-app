import "./Comment.scss"
const Comment = ({comment})=>{
    return  <div className="comment-container">
        
        <p className="comment-text">
            {comment.text}
        </p>
        <span className="createdAtComment">
            Տեղադրվել է : <span className="dataComment">{comment.createdAt}</span>
        </span>
    </div>
} 
export default Comment