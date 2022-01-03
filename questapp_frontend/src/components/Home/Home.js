import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import "./Home.scss";

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    refreshPosts();
  }, [postList]);

  if (error) {
    return <div> Error !!!</div>;
  } else if (!isLoaded) {
    return <div> Loading...</div>;
  } else {
    return (
      <div className="container">
        <div style={{ marginBottom: "0.5rem" }}>
          <PostForm userId={1} userName={"ddd"} refreshPost={refreshPosts} />
        </div>
        <div>
          {postList.map((post) => {
            return (
              <Post
                key={post.id}
                likes={post.postLikes}
                title={post.title}
                text={post.text}
                userId={post.userId}
                userName={post.userName}
                postId={post.id}
              ></Post>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Home;
