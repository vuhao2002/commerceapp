import {
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
} from "../Constants/categoryContants";
// CREATE CATEGORY
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case CREATE_CATEGORY_RESET:
      return { loading: false, success: false };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CATEGORY LIST
export const categoryListReducer = (state = { categorys: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categorys: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        categorys: state.categorys.filter((x) => x._id !== action.payload._id),
      };
    case CATEGORY_LIST_RESET:
      return { categorys: [] };
    default:
      return state;
  }
};
