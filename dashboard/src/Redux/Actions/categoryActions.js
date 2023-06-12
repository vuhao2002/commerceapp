import axios from "axios";
import {
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
} from "../Constants/categoryContants";

// CREATE CATEGORY
export const categoryCreate = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(
      `http://localhost:3000/api/category`,
      { title: title },
      config
    );
    dispatch({ type: CREATE_CATEGORY_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: message,
    });
  }
};

// LIST CATEGORY
export const listCategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:3000/api/category`,
      config
    );
    dispatch({ type: CREATE_CATEGORY_RESET });
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE BRAND
export const deleteCategory = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.delete(
    `http://localhost:3000/api/category/${id}`,
    config
  );
  dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
};
