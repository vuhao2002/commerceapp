import axios from "axios";
import {
  BRAND_DELETE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  CREATE_BRAND_FAIL,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_RESET,
  CREATE_BRAND_SUCCESS,
} from "../Constants/brandContants";

// CREATE BRAND
export const brandCreate = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_BRAND_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(
      `http://localhost:3000/api/brand`,
      { title: title },
      config
    );
    dispatch({ type: CREATE_BRAND_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_BRAND_FAIL,
      payload: message,
    });
  }
};

// LIST BRAND
export const listBrand = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`http://localhost:3000/api/brand`, config);
    dispatch({ type: CREATE_BRAND_RESET });
    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BRAND_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE BRAND
export const deleteBrand = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.delete(
    `http://localhost:3000/api/brand/${id}`,
    config
  );
  dispatch({ type: BRAND_DELETE_SUCCESS, payload: data });
};
