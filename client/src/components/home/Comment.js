import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

function Comment({ post }) {
  const [step, setStep] = useState(2);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);

  useEffect(() => {
    const newComments = post.comments.filter((comment) => !comment.reply);
    setComments(newComments);
    setShowComments(newComments.slice(-step));
  }, [post.comments, step]);

  return (
    <div>
      {showComments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}

      {comments.length - step > 0 ? (
        <div
          className="p-2 text-danger cursor-pointer"
          onClick={() => setStep(step + 10)}
        >
          Show more comments...
        </div>
      ) : (
        <div
          className="p-2 text-danger cursor-pointer"
          onClick={() => setStep(2)}
        >
          Hide comments...
        </div>
      )}
    </div>
  );
}

export default Comment;
