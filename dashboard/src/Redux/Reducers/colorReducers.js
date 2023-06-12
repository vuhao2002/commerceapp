import {
  COLOR_DELETE_SUCCESS,
  COLOR_LIST_FAIL,
  COLOR_LIST_REQUEST,
  COLOR_LIST_RESET,
  COLOR_LIST_SUCCESS,
  CREATE_COLOR_FAIL,
  CREATE_COLOR_REQUEST,
  CREATE_COLOR_RESET,
  CREATE_COLOR_SUCCESS,
} from "../Constants/colorContants";
// CREATE COLOR
export const createCOLORReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COLOR_REQUEST:
      return { loading: true };
    case CREATE_COLOR_SUCCESS:
      return { loading: false, success: true };
    case CREATE_COLOR_RESET:
      return { loading: false, success: false };
    case CREATE_COLOR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// COLOR LIST
export const colorListReducer = (state = { colors: [] }, action) => {
  switch (action.type) {
    case COLOR_LIST_REQUEST:
      return { loading: true };
    case COLOR_LIST_SUCCESS:
      return { loading: false, colors: action.payload };
    case COLOR_DELETE_SUCCESS:
      return {
        ...state,
        colors: state.colors.filter((x) => x._id !== action.payload._id),
      };
    case COLOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COLOR_LIST_RESET:
      return { colors: [] };
    default:
      return state;
  }
};
