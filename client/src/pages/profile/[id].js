import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getProfileUsers } from "../../redux/actions/profileAction";

import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import loadingImg from "../../images/loading.gif";

function Profile() {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      if (profile.ids.every((_id) => _id !== id)) {
        dispatch(getProfileUsers(id, auth.token, profile.users));
      }
    }
  }, [id, auth.token, profile.ids, profile.users, dispatch]);

  return (
    <div>
      <Info auth={auth} id={id} profile={profile} dispatch={dispatch} />
      {profile.loading ? (
        <img
          src={loadingImg}
          className="loading d-block my-2 mx-auto"
          alt="Loading..."
        />
      ) : (
        <Posts id={id} profile={profile} dispatch={dispatch} auth={auth} />
      )}
    </div>
  );
}

export default Profile;
