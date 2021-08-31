import { GLOBALTYPES, EditData, DeleteData } from "../actions/globalTypes";
import { POST_TYPES } from "../actions/postAction";
import { postDataAPI, patchDataAPI } from "../../utils/fetchData";

export const createComment = (comment, post, auth) => async (dispatch) => {
  const newPost = {
    ...post,
    comments: [...post.comments, comment],
  };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });

  try {
    const res = await postDataAPI(
      "comment",
      { ...comment, postId: post._id },
      auth.token
    );

    const newComment = {
      ...res.data.comment,
      user: auth.user,
    };
    const newPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
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

export const updateComment =
  (content, comment, post, auth) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      const newComment = await patchDataAPI(
        `comment/store/${comment._id}`,
        { content },
        auth.token
      );

      const newPost = {
        ...post,
        comments: EditData(
          post.comments,
          newComment.data.comment._id,
          newComment.data.comment
        ),
      };

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: newComment.data.msg,
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

export const likeComment = (comment, post, auth) => async (dispatch) => {
  const newComment = {
    ...comment,
    likes: [...comment.likes, auth.user],
  };
  const newPost = {
    ...post,
    comments: EditData(post.comments, newComment._id, newComment),
  };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });

  try {
    await patchDataAPI(`comment/like/${comment._id}`, null, auth.token);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const unLikeComment = (comment, post, auth) => async (dispatch) => {
  const newComment = {
    ...comment,
    likes: DeleteData(comment.likes, auth.user._id),
  };
  const newPost = {
    ...post,
    comments: EditData(post.comments, newComment._id, newComment),
  };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });
  try {
    await patchDataAPI(`comment/unlike/${comment._id}`, null, auth.token);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
