import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";

export const login = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          loading: true,
        },
      });

      const res = await postDataAPI("login", data);

      localStorage.setItem("firstLogin", true);

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
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
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");

  if (firstLogin) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true,
      },
    });
    try {
      const res = await postDataAPI("refresh_token");

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
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

export const register = (data) => async (dispatch) => {
  const checkValid = valid(data);
  if (checkValid.errLength > 0)
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: checkValid.errMsg,
    });

  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await postDataAPI("register", data);
    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
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

export const logout = () => async (dispatch) => {
  try {
    // dispatch({
    //   type: GLOBALTYPES.ALERT,
    //   payload: {
    //     loading: true,
    //   },
    // });

    // const res = await postDataAPI("logout");
    // localStorage.removeItem("firstLogin");
    // dispatch({
    //   type: GLOBALTYPES.ALERT,
    //   payload: {
    //     success: res.data.msg,
    //   },
    // });

    await postDataAPI("logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
