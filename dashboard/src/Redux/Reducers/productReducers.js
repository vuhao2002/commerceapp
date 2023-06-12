import {
  DELETE_IMG_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  UPLOAD_IMG_FAIL,
  UPLOAD_IMG_REQUEST,
  UPLOAD_IMG_SUCCESS,
} from "../Constants/productConstants";

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter((x) => x._id !== action.payload._id),
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPLOAD IMG
export const uploadImgReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case UPLOAD_IMG_REQUEST:
      return { loading: true, images: [] };
    case UPLOAD_IMG_SUCCESS:
      return {
        loading: false,
        images: action.payload,
      };
    case UPLOAD_IMG_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_IMG_SUCCESS:
      return {
        ...state,
        images: state.images.filter((x) => x.public_id !== action.payload),
      };
    default:
      return state;
  }
};

// SINGLE PRODUCT
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// EDIT PRODUCT
export const editProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
