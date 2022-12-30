import React from "react";
import truncate from "truncate";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import "moment/locale/hy-am";

import Comment from "../Comment/Comment";
import "./Post.scss";

const Post = ({
  setNewText,
  openedCom,
  setOpenedCom,
  setModalState,
  posts,
  post,
  user,
  setPosts,
  setIndex,
}) => {
  const [seeMore, setSeeMore] = React.useState(false);
  // const [showComments, setShowComments] = React.useState(false);
  const [currentComment, setCurrentComment] = React.useState("");
  moment().locale("hy-am");
  let time = moment().format("LLL");
  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const handleCommentShow = () => {
    // setShowComments(!showComments);
    let id = openedCom === post.id ? "" : post.id;
    setOpenedCom(id);
  };
  const handleNewCommentChange = (evt) => {
    setCurrentComment(evt.target.value);
  };
  const handleCommentAdd = () => {
    if (currentComment !== "") {
      let currPosts = [...posts];
      for (let item of currPosts) {
        if (item.id === post.id) {
          if (item.comments) {
            let coms = [...item.comments];
            coms.push({
              id: uuidv4(),
              userId: user.id,
              text: currentComment,
              createdAt: time,
            });
            item.comments = [...coms];
          } else {
            item.comments = [
              {
                id: uuidv4(),
                userId: user.id,
                text: currentComment,
                createdAt: time,
              },
            ];
          }
        }
      }
      setCurrentComment("");
      setPosts(currPosts);
    } else {
      alert("Cant post empty text");
    }
  };
  function handleEdit() {
    setModalState({ type: "edit", open: true });
    setIndex(
      posts.findIndex((el) => {
        return el.id === post.id;
      })
    );
    setOpenedCom("")
    setNewText({ description: post.text, title: post.title });
  }
  function handleDelete() {
    setModalState({ type: "delete", open: true });
    setIndex(
      posts.findIndex((el) => {
        return el.id === post.id;
      })
    );
    setOpenedCom("")
  }
  return (
    <div className="wholePostContainer">
      <div className="postContainer">
        <div className="upPost">
          <h2 >{post.title}</h2>
          <span style={{ color: "white", fontWeight: "700",position:"absolute",right:"90px" }}>
            {post.createdAt}
          </span>
          <div className="controlPost">
            
          <i class="gg-edit-markup " onClick={handleEdit}></i>

            <i class="gg-remove" onClick={handleDelete}></i>
          </div>
        </div>
        <div className="innerPost">
          <p className="PostText">
            {truncate(post.text, seeMore ? post.text.length : 50)}{" "}
            {post.text.length > 50 && (
              <a href="#" className="seeLessMore" onClick={handleSeeMore}>
                See {!seeMore ? "More" : "Less"}
              </a>
            )}
          </p>
        </div>
        {post.modifiedAt && (
          <span
            style={{
              padding: "20px 5px",
              color: "white",
              fontWeight:"400",
              fontSize:"17px"
            }}>
            <span style={{fontSize:"17px", color: "rgb(183, 255, 0)" }}>
              Փոփոխվել է -{" "}
            </span>
            {post.modifiedAt}
          </span>
        )}
      </div>

      <span className="commentViewer">
        <button onClick={handleCommentShow} className="commentShower">
          {openedCom == post.id ? "Close Comments" : "Show Comments"}
        </button>
        {openedCom !== post.id && post.comments
          ? "(" + post.comments.length + " Comments)"
          : null}
      </span>
      <div className="commentsContainer">
        {openedCom === post.id ? (
          <>
            {" "}
            <div className="typeNewComment">
              <textarea
                value={currentComment}
                onChange={handleNewCommentChange}
                className="newCommentTextarea"
                name=""
                id=""
                cols="80"
                rows="3"
                placeholder="Add new comment"></textarea>
              <div onClick={handleCommentAdd} className="submitComment">
                <img
                  className="submitCommentIcon"
                  src="https://cdn-icons-png.flaticon.com/512/3388/3388627.png"
                  alt=""
                />
              </div>
            </div>{" "}
            {post.comments &&
              post.comments.map((el, i) => {
                return <Comment key={i} comment={el} />;
              })}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
