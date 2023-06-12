import axios from "axios";
import {
  DASHBOARD_FAIL,
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  STATUS_ORDER_DELIVERED_SUCCESS,
  SUM_AMOUNT_SUCCESS,
} from "../Constants/dashboardContants";

// DASHBOARD
export const dashboardChart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:3000/api/product/get-sale-by-month`,
      config
    );

    dispatch({ type: DASHBOARD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DASHBOARD_FAIL,
      payload: message,
    });
  }
};

// GET STATUS ORDER DELIVERED
export const countOrdersDelivered = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get(
    `http://localhost:3000/api/user/orders-delivered`,
    config
  );
  dispatch({ type: STATUS_ORDER_DELIVERED_SUCCESS, payload: data });
};

// GET STATUS ORDER DELIVERED
export const sumAmountOrderDelivered = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get(
    `http://localhost:3000/api/user/sum-amount`,
    config
  );
  dispatch({ type: SUM_AMOUNT_SUCCESS, payload: data });
};
