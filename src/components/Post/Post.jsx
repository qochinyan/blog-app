import "./Post.scss";
import React from "react";
import truncate from "truncate";
import Comment from "../Comment/Comment";
const Post = ({ posts, post, user, setPosts, id }) => {
  const [seeMore, setSeeMore] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [currentComment, setCurrentComment] = React.useState("");
  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const handleCommentShow = () => {
    setShowComments(!showComments);
  };
  const handleNewCommentChange = (evt) => {
    setCurrentComment(evt.target.value);
  };
  const handleCommentAdd = () => {
    if (currentComment !== "") {
      let currPosts = [...posts];
      for (let item of currPosts) {
        if (item.id === post.id) {
          let coms = [...item.comments];
          coms.push(currentComment);
          item.comments = coms;
          console.log(...currPosts);
        }
      }
      setCurrentComment("");
      setPosts(currPosts);
    }else{
      alert("Cant post empty text")
    }
  };
  console.log(currentComment);
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
      <div className="typeNewComment">
        <textarea
          value={currentComment}
          onChange={handleNewCommentChange}
          className="newCommentTextarea"
          name=""
          id=""
          cols="80"
          rows="3"></textarea>
        <div onClick={handleCommentAdd} className="submitComment">
          <img
            className="submitCommentIcon"
            src="https://cdn-icons-png.flaticon.com/512/3388/3388627.png"
            alt=""
          />
        </div>
      </div>
      <span className="commentViewer">
        <button onClick={handleCommentShow} className="commentShower">
          {showComments ? "Close Comments" : "Show Comments"}
        </button>
        {!showComments
          ? post.comments
            ? "(" + post.comments.length + " Comments)"
            : null
          : null}
      </span>
      <div className="commentsContainer">
        {showComments
          ? post.comments.map((el, i) => {
              return <Comment comment={el} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Post;
