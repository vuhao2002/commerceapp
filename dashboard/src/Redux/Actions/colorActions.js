import axios from "axios";
import {
  COLOR_DELETE_SUCCESS,
  COLOR_LIST_FAIL,
  COLOR_LIST_REQUEST,
  COLOR_LIST_SUCCESS,
  CREATE_COLOR_FAIL,
  CREATE_COLOR_REQUEST,
  CREATE_COLOR_RESET,
  CREATE_COLOR_SUCCESS,
} from "../Constants/colorContants";

// CREATE BRAND
export const colorCreate = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_COLOR_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(
      `http://localhost:3000/api/color`,
      { title: title },
      config
    );
    dispatch({ type: CREATE_COLOR_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_COLOR_FAIL,
      payload: message,
    });
  }
};

// LIST COLOR
export const listColor = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COLOR_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`http://localhost:3000/api/color`, config);

    dispatch({ type: CREATE_COLOR_RESET });
    dispatch({ type: COLOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COLOR_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE COLOR
export const deleteColor = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.delete(
    `http://localhost:3000/api/color/${id}`,
    config
  );
  dispatch({ type: COLOR_DELETE_SUCCESS, payload: data });
};
