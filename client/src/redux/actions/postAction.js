import { GLOBALTYPES, DeleteData } from "../actions/globalTypes";
import { getDataAPI, postDataAPI, patchDataAPI } from "../../utils/fetchData";
import imageUpload from "../../utils/imageUpload";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  GET_POSTS: "GET_POSTS",
  LOADING_POST: "LOADING_POST",
  UPDATE_POST: "UPDATE_POST",
};

export const createPost = (content, images, auth) => async (dispatch) => {
  let media = [];
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    if (images.length > 0) media = await imageUpload(images);

    const res = await postDataAPI(
      "post/create",
      { content, images: media },
      auth.token
    );

    dispatch({
      type: POST_TYPES.CREATE_POST,
      payload: res.data.post,
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

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: true,
    });

    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: {
        posts: res.data.posts,
        result: res.data.result,
      },
    });

    dispatch({
      type: POST_TYPES.LOADING_POST,
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
};

export const updatePost =
  (content, images, auth, status) => async (dispatch) => {
    let media = [];
    const newImages = images.filter((image) => !image.url);
    const oldImages = images.filter((image) => image.url);

    if (
      content === status.content &&
      newImages.length === 0 &&
      oldImages.length === status.images.length
    )
      return;

    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          loading: true,
        },
      });

      if (newImages.length > 0) media = await imageUpload(newImages);

      const res = await patchDataAPI(
        `post/store/${status._id}`,
        {
          content,
          images: [...oldImages, ...media],
        },
        auth.token
      );

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.post,
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

export const likePost = (post, auth) => async (dispatch) => {
  const newPost = {
    ...post,
    likes: [...post.likes, auth.user],
  };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });
  try {
    await patchDataAPI(`post/like/${post._id}`, null, auth.token);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const unLikePost = (post, auth) => async (dispatch) => {
  const newPost = {
    ...post,
    likes: DeleteData(post.likes, auth.user._id),
  };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });

  try {
    await patchDataAPI(`post/unlike/${post._id}`, null, auth.token);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
