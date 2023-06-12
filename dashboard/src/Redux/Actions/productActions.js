import {
  CREATE_PRODUCT_SUCCESS,
  DELETE_IMG_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  UPLOAD_IMG_FAIL,
  UPLOAD_IMG_REQUEST,
  UPLOAD_IMG_SUCCESS,
} from "../Constants/productConstants";

import axios from "axios";
// UPLOAD IMG
export const imgUpload = (dataImg) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPLOAD_IMG_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const formData = new FormData();
    for (var i = 0; i < dataImg.length; i++) {
      formData.append("images", dataImg[i]);
    }
    const { data } = await axios.post(
      "http://localhost:3000/api/upload/",
      formData,
      config
    );
    dispatch({ type: UPLOAD_IMG_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPLOAD_IMG_FAIL,
      payload: message,
    });
  }
};

// REMOVE IMG
export const deleteImg = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.delete(
    `http://localhost:3000/api/upload/delete-img/${id}`,
    config
  );
  dispatch({ type: DELETE_IMG_SUCCESS, payload: data });
};

// CREATE PRODUCT
export const createProduct = (dataProduct) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  await axios.post(
    `http://localhost:3000/api/product/create`,
    dataProduct,
    config
  );
  dispatch({ type: CREATE_PRODUCT_SUCCESS });
};

// PRODUCT LIST
export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/api/product/products`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.delete(
    `http://localhost:3000/api/product/${id}`,
    config
  );
  dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
};

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// EDIT PRODUCT
export const productEdit = (id, values) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    await axios.put(`/api/product/${id}`, { ...values }, config);
    dispatch({ type: PRODUCT_EDIT_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
