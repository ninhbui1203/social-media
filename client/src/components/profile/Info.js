import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProfileUsers } from "../../redux/actions/profileAction";

import Followers from "./Followers";
import Following from "./Following";

import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";

function Info() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const { auth, profile } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      if (auth.user._id === id) {
        setUserData([auth.user]);
      } else {
        dispatch(getProfileUsers(id, auth.token, profile.users));

        const newData = profile.users.filter((user) => user._id === id);
        setUserData(newData);
      }
    }
  }, [id, auth, profile.users, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="big-avatar" />

          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {auth.user._id !== id ? (
                <FollowBtn user={user} />
              ) : (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setEditUser(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="follow_btn my-2">
              <span className="mr-4" onClick={() => setShowFollowers(true)}>
                {user.followers.length} Followers
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                {user.following.length} Following
              </span>
            </div>

            <h6>
              {user.fullname} <span className="text-danger">{user.mobile}</span>
            </h6>
            <p>{user.address}</p>
            <h6>{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>

          {editUser && <EditProfile setEditUser={setEditUser} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Info;
