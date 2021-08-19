import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

function UserCard({
  children,
  user,
  handleCloseSearch,
  setShowFollowers,
  setShowFollowing,
}) {
  const handleClick = () => {
    if (handleCloseSearch) handleCloseSearch();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  return (
    <div className="card-user d-flex p-2 align-items-center justify-content-between border">
      <Link
        to={`/profile/${user._id}`}
        onClick={handleClick}
        className="d-flex align-items-center"
      >
        <Avatar src={user.avatar} size="medium-avatar" />
        <div className="ml-2">
          <span className="d-block">{user.fullname}</span>
          <small style={{ opacity: 0.7 }}>{user.username}</small>
        </div>
      </Link>
      {children}
    </div>
  );
}

export default UserCard;
