import { GLOBALTYPES } from "../actions/globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import imageUpload from "../../utils/imageUpload";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
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

    console.log(media);

    const res = await postDataAPI(
      "post/create",
      { content, images: media },
      auth.token
    );

    console.log(res);

    dispatch({
      type: POST_TYPES.CREATE_POST,
      payload: res.data.post,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: false,
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
