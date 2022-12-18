import "./Post.scss";
import React from "react";
import truncate from "truncate"
const Post = ({ post, user }) => {
  const [seeMore,setSeeMore] = React.useState(false)
  const handleSeeMore = ()=>{
    setSeeMore(!seeMore)
  }
  return (
    <div className="postContainer">
      <div className="upPost">
        <h2>{post.title}</h2>
    <div className="controlPost">
      <img className="editImg" src="https://cdn-icons-png.flaticon.com/512/1057/1057097.png" alt="" />
      <img className="delImg" src="https://cdn-icons-png.flaticon.com/512/1632/1632602.png" alt="" />
    </div>
      </div>
      <div className="innerPost">
        <span className="PostText" ><p className="PostTextInner">{truncate(post.text,seeMore ? post.text.length : 50)}</p>
        <a href="#" onClick={handleSeeMore}>See {!seeMore ? "More": "Less"}</a></span>
      </div>
    </div>
  );
};

export default Post;
