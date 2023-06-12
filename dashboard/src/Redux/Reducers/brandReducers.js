import {
  BRAND_DELETE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_RESET,
  BRAND_LIST_SUCCESS,
  CREATE_BRAND_FAIL,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_RESET,
  CREATE_BRAND_SUCCESS,
} from "../Constants/brandContants";
// CREATE BRAND
export const createBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BRAND_REQUEST:
      return { loading: true };
    case CREATE_BRAND_SUCCESS:
      return { loading: false, success: true };
    case CREATE_BRAND_RESET:
      return { loading: false, success: false };
    case CREATE_BRAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// BRAND LIST
export const brandListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { loading: true };
    case BRAND_LIST_SUCCESS:
      return { loading: false, brands: action.payload };
    case BRAND_DELETE_SUCCESS:
      return {
        ...state,
        brands: state.brands.filter((x) => x._id !== action.payload._id),
      };
    case BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_LIST_RESET:
      return { brands: [] };
    default:
      return state;
  }
};
