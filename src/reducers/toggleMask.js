import { TOGGLE_MASK } from "../actions/types";
/////////

const toggleMask = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MASK:
      return action.payload;
    default:
      return state;
  }
};

export default toggleMask;
