import {
  ORDER_CHANGE_STATUS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
} from "../Constants/orderContants";
// USER ORDERS
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_CHANGE_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
