import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followProfile, unfollowProfile } from "../redux/actions/profileAction";

function FollowBtn({ user }) {
  const [follow, setFollow] = useState(false);

  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleFollow = (e) => {
    setFollow(true);
    dispatch(followProfile(profile.users, user, auth));
  };

  const handleUnfollow = (e) => {
    setFollow(false);
    dispatch(unfollowProfile(profile.users, user, auth));
  };

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollow(true);
    }
  }, [auth.user.following, user]);

  return (
    <>
      {follow ? (
        <button
          type="button"
          className="btn btn btn-outline-danger"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      ) : (
        <button
          type="button"
          className="btn btn btn-outline-info"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </>
  );
}

export default FollowBtn;
