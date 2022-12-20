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
      {posts.map((post,i) => (
        <Post key={i} posts={posts} id={post.id} setPosts={setPosts}  post={post} user={findUser(post.userId)} />
      ))}
    </div>
  );
}

export default App;
