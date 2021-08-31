import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";

import { BASE_URL } from "../../../utils/config";

import Avatar from "../../Avatar";

function CardHeader({ post }) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: {
        ...post,
        isEdit: true,
      },
    });
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id, auth));
    history.push("/");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="medium-avatar" />

        <div className="card_name">
          <h6 className="m-0">
            <Link className="text-dark" to={`/profile/${post.user._id}`}>
              {post.user.username}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>
        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span> Edit post
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_outline</span> Remove
                post
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons">content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardHeader;
