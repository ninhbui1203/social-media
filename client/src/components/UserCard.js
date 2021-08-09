import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

function UserCard({ user, handleCloseSearch }) {
  const handleClick = () => {
    if (!handleCloseSearch) return;
    handleCloseSearch();
  };

  return (
    <Link to={`/profile/${user._id}`} onClick={handleClick}>
      <div className="card-user d-flex p-2 align-items-center border">
        <Avatar src={user.avatar} size="medium-avatar" />
        <div className="ml-2">
          <span className="d-block">{user.fullname}</span>
          <small style={{ opacity: 0.7 }}>{user.username}</small>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
