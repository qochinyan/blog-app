import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import "./App.css";
import { posts as userPosts, users as authors } from "../../const";
import Post from "../Post/Post";

function App() {
  const [posts, setPosts] = useState(userPosts);
  const [watchingComments, setWatchingComments] = useState("");
  const [newText,setNewText] = useState("");
  const [index, setIndex] = useState();
  const [modalState, setModalState] = React.useState({
    open: false,
    type: "none",
  });
  const findUser = (userId) => {
    return authors.find((user) => user.id === userId);
  };
  // Modal
  let subtitle;
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

  function openModal() {
    setModalState({ ...modalState, open: true });
  }

  function closeModal() {
    setModalState({ ...modalState, open: false });
  }
  function deletePost() {
    let newPost = [...posts];
    newPost.splice(index, 1);
    setPosts(newPost);
    closeModal();
  }
  function handleEditPost() {
    let newPosts = [...posts];
    newPosts[index].text = newText;
    setPosts(newPosts)
    closeModal()
  }
  function handleNewTextChange(evt) {
    setNewText(evt.target.value)
  }
  return (
    <div className="App">
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
            <textarea
              onChange={handleNewTextChange}
              value={newText}
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
