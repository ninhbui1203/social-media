import { GLOBALTYPES } from "../actions/globalTypes";

function themeReducer(state = false, action) {
  switch (action.type) {
    case GLOBALTYPES.THEME:
      return action.payload;
    default:
      return state;
  }
}

export default themeReducer;
