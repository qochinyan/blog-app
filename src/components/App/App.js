import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import "./App.css";
import { posts as userPosts, users as authors } from "../../const";
import Post from "../Post/Post";

function App() {
  const [posts, setPosts] = useState(userPosts);
  const [users] = useState(authors);
  const [watchingComments, setWatchingComments] = useState("");
  const findUser = (userId) => {
    return users.find((user) => user.id === userId);
  };
  const[index,setIndex]=useState()
  const[isntDeleting,setDeleting]=useState(true)
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
      width: "700px",
      height: "500px",
      alignItems: "center",
      justifyContent: "space-around",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  

  function closeModal() {
    setIsOpen(false);
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
          setIsOpen={setIsOpen}
          setIndex={setIndex}
          setDeleting={setDeleting}
        />
      ))}
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStylesModal}
        contentLabel="Example Modal"
      >
       {!isntDeleting && <textarea value={posts[index].text} style={{ resize: "none" ,width:"400px",height:"150px",padding:"10px 20px"}}></textarea>}

        <div style={{width:"250px",display:"flex",justifyContent:"space-between"}}>
          <button style={{width:"100px",height:"40px"}} onClick={closeModal}>Close</button>
          <button style={{width:"100px",height:"40px"}} onClick={closeModal}>Save</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
