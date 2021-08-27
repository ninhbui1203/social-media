import React from "react";

function CommentMenu({ comment, post, auth, handleEditComment }) {
  const MenuItem = () => (
    <>
      <div className="dropdown-item" onClick={() => handleEditComment()}>
        <span className="material-icons">create</span> Edit
      </div>
      <div className="dropdown-item">
        <span className="material-icons">delete_outline</span> Remove
      </div>
    </>
  );

  return (
    <div className="menu">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div className="nav-item dropdown">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_vert
          </span>

          <div className="dropdown-menu">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item">
                  <span className="material-icons">delete_outline</span> Remove
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentMenu;
