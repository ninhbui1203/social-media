import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

function InputComment({ post }) {
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createAt: new Date().toISOString(),
    };
    dispatch(createComment(newComment, post, auth));

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="card-footer comment_input">
      <input
        type="text"
        name="content"
        value={content}
        placeholder="Add your comment..."
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
}

export default InputComment;
