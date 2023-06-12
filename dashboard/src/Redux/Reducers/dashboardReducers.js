import {
  DASHBOARD_FAIL,
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  STATUS_ORDER_DELIVERED_SUCCESS,
  SUM_AMOUNT_SUCCESS,
} from "../Constants/dashboardContants";

// COLOR LIST
export const dashboardReducer = (state = { charts: [] }, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return { loading: true };
    case DASHBOARD_SUCCESS:
      return { loading: false, charts: action.payload };
    case STATUS_ORDER_DELIVERED_SUCCESS:
      return { ...state, countOrders: action.payload };
    case SUM_AMOUNT_SUCCESS:
      return { ...state, sumAmount: action.payload };
    case DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
