import { POST_TYPES } from "../actions/postAction";
import { EditData, DeleteData } from "../actions/globalTypes";

function postDetailReducer(state = [], action) {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return [...state, action.payload];
    case POST_TYPES.UPDATE_POST:
      return EditData(state, action.payload._id, action.payload);
    case POST_TYPES.DELETE_POST:
      return DeleteData(state, action.payload);
    default:
      return state;
  }
}

export default postDetailReducer;
