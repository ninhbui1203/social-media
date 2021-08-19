import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import imageUpload from "../../utils/imageUpload";

import { GLOBALTYPES, DeleteData } from "./globalTypes";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const getProfileUsers = (id, token, users) => async (dispatch) => {
  if (users.every((user) => user._id !== id)) {
    try {
      dispatch({
        type: PROFILE_TYPES.LOADING,
        payload: true,
      });
      const res = await getDataAPI(`profile/${id}`, token);
      dispatch({
        type: PROFILE_TYPES.GET_USER,
        payload: res.data,
      });
      dispatch({
        type: PROFILE_TYPES.LOADING,
        payload: false,
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }
};

export const updateProfileUser = (data, avatar, auth) => async (dispatch) => {
  if (!data.fullname)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Please add your full name." },
    });

  if (data.fullname.length > 25)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Max full name is 25 characters." },
    });

  try {
    let media;

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    // upload image to cloudinary
    if (avatar) media = await imageUpload([avatar]);

    const res = await patchDataAPI(
      "profile/update",
      {
        ...data,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    );

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...data,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
      },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const followProfile = (data, user, auth) => async (dispatch) => {
  // Update followers
  const newUser = {
    ...user,
    followers: [...user.followers, auth.user],
  };

  dispatch({
    type: PROFILE_TYPES.FOLLOW,
    payload: newUser,
  });

  // Update following
  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user,
        following: [...auth.user.following, newUser],
      },
    },
  });

  try {
    await patchDataAPI(`profile/${user._id}/follow`, null, auth.token);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const unfollowProfile = (data, user, auth) => async (dispatch) => {
  // Delete followers
  const newUser = {
    ...user,
    followers: DeleteData(user.followers, auth.user._id),
  };
  dispatch({
    type: PROFILE_TYPES.UNFOLLOW,
    payload: newUser,
  });

  // Delete following
  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user,
        following: DeleteData(auth.user.following, newUser._id),
      },
    },
  });
  try {
    await patchDataAPI(`profile/${user._id}/unfollow`, null, auth.token);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
