import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { likePost, unLikePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";

import LikeButton from "../../LikeButton";
import ShareModal from "../../ShareModal";

function CardFooter({ post }) {
  const [isLike, setIsLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleLike = () => {
    dispatch(likePost(post, auth));
    setIsLike(true);
  };

  const handleUnLike = () => {
    dispatch(unLikePost(post, auth));
    setIsLike(false);
  };

  useEffect(() => {
    if (post.likes.find((item) => item._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [auth.user._id, post.likes]);

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/post/${post._id}`}>
            <i className="far fa-comment" />
          </Link>
          <i
            className="fas fa-paper-plane"
            onClick={() => setIsShare(!isShare)}
          />
        </div>
        <i className="far fa-bookmark" />
      </div>

      <div className="d-flex justify-content-between px-4">
        <h6 style={{ padding: "0 10px" }}>{post.likes.length} likes</h6>
        <h6>{post.comments.length} comments</h6>
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
}

export default CardFooter;
