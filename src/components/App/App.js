import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";
import { posts as userPosts, users as authors } from "../../const";
import Post from "../Post/Post";
import { URL } from "../../const";
import moment from "moment";
import "moment/locale/hy-am";

function App() {
  const [posts, setPosts] = useState([]);
  const [watchingComments, setWatchingComments] = useState("");
  const [newText, setNewText] = useState({
    title: "",
    description: "",
  });
  const [index, setIndex] = useState();
  const [modalState, setModalState] = React.useState({
    open: false,
    type: "none",
  });
  moment().locale("hy-am");

  useEffect(() => {
    axios.get(`${URL}posts.json`).then((data) => {
      let fetchPosts = !!data.data
        ? Object.keys(data.data).map((key) => ({ ...data.data[key], id: key }))
        : [];
      setPosts(fetchPosts);
    });
  }, []);

  const findUser = (userId) => {
    return authors.find((user) => user.id === userId);
  };
  // Modal
  const customStylesModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      width: modalState.type === "edit" ? "800px" : "400px",
      height: modalState.type === "edit" ? "350px" : "200px",
      alignItems: "center",
      justifyContent: "space-around",
      borderColor:
        modalState.type === "edit" ? "rgb(54, 0, 76)" : "rgb(0,76,13,.7)",
    },
  };

  // function openModal() {
  //   setModalState({ ...modalState, open: true });
  // }

  function closeModal() {
    setModalState({ ...modalState, open: false });
    setNewText({ title: "", description: "" });
  }
  function deletePost() {
    axios.delete(`${URL}posts/${posts[index].id}.json`).then(() => {
      let newPost = [...posts];
      newPost.splice(index, 1);
      setPosts(newPost);
      closeModal();
    });
  }
  function handleEditPost() {
    let newPosts = [...posts];
    newPosts[index].text = newText.description;
    newPosts[index].title = newText.title;
    newPosts[index].modifiedAt = moment().format("LLL")
    axios
      .put(`${URL}posts/${posts[index].id}.json`, newPosts[index])
      .then(() => {
        setPosts(newPosts);
        closeModal();
      });
  }
  function handleTitleChange(evt) {
    setNewText({ ...newText, title: evt.target.value });
  }
  function handleNewPostChange(evt) {
    setNewText({ ...newText, description: evt.target.value });
  }
  function handleAddPost() {
    if (newText.title.trim(" ") === "" || newText.description.trim(" ") === "") {
      alert("inputs can't be empty");
    } else {
      let newPost = {
        id: uuidv4(),
        createdAt: moment().format("LLL"),
        userId: "me",
        modifiedAt: null,
        text: newText.description,
        category: "Any category",
        title: newText.title,
        comments: [],
      };
      axios
        .post(`${URL}posts.json`, newPost)
        .then(() => setPosts([...posts, newPost]));
    }
  }
  return (
    <div className="App">
      <div className="postAdder">
        <input
          type="text"
          placeholder="Title"
          className="postAdder-textarea input"
          onChange={handleTitleChange}
          value={newText.title}
        />
        <textarea
          onChange={handleNewPostChange}
          value={newText.description}
          className="postAdder-textarea"
          placeholder="Post Description"></textarea>
        <button onClick={handleAddPost}>Post</button>
      </div>
      {posts.map((post, i) => (
        <Post
          openedCom={watchingComments}
          setOpenedCom={setWatchingComments}
          key={i}
          posts={posts}
          id={post.id}
          setPosts={setPosts}
          post={post}
          user={findUser(post.userId)}
          setModalState={setModalState}
          setIndex={setIndex}
          setNewText={setNewText}
        />
      ))}
      <Modal
        isOpen={modalState.open}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesModal}
        contentLabel="Example Modal">
        {modalState.type === "edit" ? (
          <>
            <input
              type="text"
              placeholder="Title"
              value={newText.title}
              style={{
                resize: "none",
                width: "600px",
                height: "30px",
                padding: "10px 20px",
                overflow: "auto",
              }}
              onChange={handleTitleChange}
            />
            <textarea
              onChange={handleNewPostChange}
              value={newText.description}
              style={{
                resize: "none",
                width: "600px",
                height: "150px",
                padding: "10px 20px",
                overflow: "auto",
              }}
              className="editText"></textarea>

            <div
              style={{
                width: "250px",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <button
                style={{
                  width: "100px",
                  height: "40px",
                  border: "none",
                  background: "rgb(255, 0, 55)",
                  color: "white",
                }}
                onClick={closeModal}>
                Close
              </button>
              <button
                style={{
                  width: "100px",
                  height: "40px",
                  border: "none",
                  background: "lime",
                  color: "white",
                }}
                onClick={handleEditPost}>
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ color: "rgb(0,76,13)", fontWeight: "400" }}>
              Do you Want to Delete Post?
            </h2>
            <div
              style={{
                width: "220px",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <button
                style={{
                  width: "100px",
                  height: "40px",
                  border: "none",
                  background: "red",
                  color: "white",
                }}
                onClick={closeModal}>
                No
              </button>
              <button
                style={{
                  width: "100px",
                  height: "40px",
                  border: "none",
                  background: "green",
                  color: "white",
                }}
                onClick={deletePost}>
                Yes
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default App;
