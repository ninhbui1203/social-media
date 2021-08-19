import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";

function Following({ users, setShowFollowing }) {
  const { auth } = useSelector((state) => state);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5>Following</h5>
        <hr />
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setShowFollowing={setShowFollowing}
          >
            {user._id !== auth.user._id && <FollowBtn user={user} />}
          </UserCard>
        ))}

        <div className="close" onClick={() => setShowFollowing(false)}>
          &times;
        </div>
      </div>
    </div>
  );
}

export default Following;
