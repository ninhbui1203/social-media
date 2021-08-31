import React from "react";
import { Link } from "react-router-dom";

function PostThumb({ posts }) {
  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            <img src={post.images[0].url} alt={post.images[0].url} />
            <div className="post_thumb_menu">
              <i className="far fa-heart">&nbsp;{post.likes.length}</i>
              <i className="far fa-comment">&nbsp;{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostThumb;
