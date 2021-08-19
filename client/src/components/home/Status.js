import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

function Status(props) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} size="medium-avatar" />
      <button
        className="statusBtn flex-fill"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        {auth.user.username}, What are you thinking?
      </button>
    </div>
  );
}

export default Status;
