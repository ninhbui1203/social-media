import { POST_TYPES } from "../actions/postAction";

const initalState = {
  posts: [],
};

function postReducer(state = initalState, action) {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
}

export default postReducer;
