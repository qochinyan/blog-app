import "./Post.scss";
import React from "react";
import truncate from "truncate";
import Comment from "../Comment/Comment";
import { v4 as uuidv4   }from "uuid";
import moment from "moment";
import 'moment/locale/hy-am'
const Post = ({openedCom,setOpenedCom, posts, post, user, setPosts, id }) => {
  const [seeMore, setSeeMore] = React.useState(false);
  // const [showComments, setShowComments] = React.useState(false);
  const [currentComment, setCurrentComment] = React.useState("");
   moment().locale("hy-am")
   let time = moment().format("LLL")
  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const handleCommentShow = () => {
    // setShowComments(!showComments);
    let id ;
    id = openedCom===post.id ?  "" : post.id
    setOpenedCom(id)
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
          coms.push({
            id: uuidv4(),
            userId: user.id,
            text: currentComment,
            createdAt: time,
          });
          item.comments = coms;
        }
      }
      setCurrentComment("");
      setPosts(currPosts);
    } else {
      alert("Cant post empty text");
    }
  };
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
            <a href="#" className="seeLessMore" onClick={handleSeeMore}>
              See {!seeMore ? "More" : "Less"}
            </a>
          </p>
        </div>
      </div>
      
      <span className="commentViewer">
        <button onClick={handleCommentShow} className="commentShower">
          {openedCom == post.id ? "Close Comments" : "Show Comments"}
        </button>
        {openedCom !== post.id
          && post.comments
            ? "(" + post.comments.length + " Comments)"
            : null}
      </span>
      <div className="commentsContainer">
        { openedCom === post.id
          ? <> <div className="typeNewComment">
        <textarea
          value={currentComment}
          onChange={handleNewCommentChange}
          className="newCommentTextarea"
          name=""
          id=""
          cols="80"
          rows="3"
        ></textarea>
        <div onClick={handleCommentAdd} className="submitComment">
          <img
            className="submitCommentIcon"
            src="https://cdn-icons-png.flaticon.com/512/3388/3388627.png"
            alt=""
          />
        </div>
      </div> {post.comments.map((el, i) => {
              return <Comment key={i} comment={el} /> 
            })}
         </> : null}
      </div>
    </div>
  );
};

export default Post;
