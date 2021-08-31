import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../../redux/actions/commentAction";

import Avatar from "../../Avatar";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";

function CommentCard({ comment, post }) {
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeComment(comment, post, auth));
    setIsLike(true);
  };

  const handleUnLike = () => {
    dispatch(unLikeComment(comment, post, auth));
    setIsLike(false);
  };

  const handleCancelEditComment = () => {
    setContent(comment.content);
    setIsEdit(false);
  };

  const handleEditComment = () => {
    setIsEdit(true);
  };

  const handleUpdateComment = () => {
    setIsEdit(false);
    if (content === comment.content) {
      return;
    } else {
      dispatch(updateComment(content, comment, post, auth));
    }
  };

  useEffect(() => {
    if (comment.content) setContent(comment.content);

    if (comment.likes.find((item) => item._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth]);

  const styleCard = {
    opacity: comment._id ? "1" : "0.5",
    pointerEvents: comment._id ? "inherit" : "none",
  };
  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link
        to={`/profile/${comment.user._id}`}
        className="d-flex align-items-center text-dark"
      >
        <Avatar src={comment.user.avatar} size="medium-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>
      <div className="comment_content">
        <div className="flex-fill">
          {isEdit ? (
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          ) : (
            <>
              {content.length < 100
                ? content
                : readMore
                ? content
                : content.slice(0, 100) + "..."}

              {content.length > 100 && (
                <span
                  className="ml-3 readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Hidden content" : "Read more"}
                </span>
              )}
            </>
          )}

          <div>
            <small className="text-muted mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>
            <small className="font-weight-bold mr-3">
              {comment.likes.length}{" "}
              {comment.likes.length > 1 ? "likes" : "like"}
            </small>

            {isEdit ? (
              <>
                <small
                  className="font-weight-bold mr-3 cursor-pointer text-danger"
                  onClick={handleUpdateComment}
                >
                  Update
                </small>
                <small
                  className="font-weight-bold mr-3 cursor-pointer text-danger"
                  onClick={handleCancelEditComment}
                >
                  Cancel
                </small>
              </>
            ) : (
              <small className="font-weight-bold mr-3">reply</small>
            )}
          </div>
        </div>
        {isEdit || (
          <div className="d-flex align-items-center" style={{ width: "40px" }}>
            <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />

            <CommentMenu
              comment={comment}
              post={post}
              auth={auth}
              handleEditComment={handleEditComment}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
