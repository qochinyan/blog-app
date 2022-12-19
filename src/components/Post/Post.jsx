import "./Post.scss";
import React from "react";
import truncate from "truncate";
import Comment from "../Comment/Comment";
const Post = ({ post, user }) => {
  const [seeMore, setSeeMore] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const handleCommentShow =()=>{
    setShowComments(!showComments)
  }
  return (
    <div className="wholePostContainer">
      <div className="postContainer">
        <div className="upPost">
          <h2>{post.title}</h2>
          <div className="controlPost">
            <img
              className="editImg"
              src="https://cdn-icons-png.flaticon.com/512/1057/1057097.png"
              alt=""
            />
            <img
              className="delImg"
              src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png"
              alt=""
            />
          </div>
        </div>
        <div className="innerPost">
          <p className="PostText">
            {truncate(post.text, seeMore ? post.text.length : 50)}{" "}
            <a href="#" onClick={handleSeeMore}>
              See {!seeMore ? "More" : "Less"}
            </a>
          </p>
        </div>
      </div>
      <button onClick={handleCommentShow} className="commentShower">{showComments ? "Close Comments" : "Show Comments"}</button>
      <div className="commentsContainer">
        {
         showComments ? post.comments.map((el,i)=>{
            return <Comment  comment={el}/>
          }) : null
        }
      </div>
    </div>
  );
};

export default Post;
