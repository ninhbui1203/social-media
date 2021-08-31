import React, { useState, useEffect } from "react";

import PostThumb from "../PostThumb";

function Posts({ id, profile, auth, dispatch }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    profile.userPosts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
      }
    });
  }, [id, profile]);

  return (
    <div>
      <PostThumb posts={posts} />
    </div>
  );
}

export default Posts;
