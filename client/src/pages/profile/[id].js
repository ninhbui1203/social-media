import React from "react";
import { useSelector } from "react-redux";

import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import loadingImg from "../../images/loading.gif";

function Profile() {
  const { profile } = useSelector((state) => state);

  return (
    <div>
      {profile.loading ? (
        <img
          src={loadingImg}
          className="loading d-block my-2 mx-auto"
          alt="Loading..."
        />
      ) : (
        <Info />
      )}
      <Posts />
    </div>
  );
}

export default Profile;
