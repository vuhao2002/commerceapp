import axios from "axios";
import {
  ORDER_CHANGE_STATUS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
} from "../Constants/orderContants";

// USER ORDERS
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:3000/api/user/get-orders`,
      config
    );
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

// CHANGE STATUS ORDER
export const orderChangeStatus = (id, status) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(
      `http://localhost:3000/api/user/order/update-order/${id}`,
      {
        status: status,
      },
      config
    );

    dispatch({ type: ORDER_CHANGE_STATUS_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};
