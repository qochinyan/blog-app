import { useState } from "react";

import "./App.css";
import { posts as userPosts, users as authors } from "../../const";
import Post from "../Post/Post";

function App() {
  const [posts, setPosts] = useState(userPosts);
  const [users] = useState(authors);

  const findUser = (userId) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <div className="App">
      {posts.map((post) => (
        <Post key={post.id} post={post} user={findUser(post.userId)} />
      ))}
    </div>
  );
}

export default App;
