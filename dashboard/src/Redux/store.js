import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  editProductReducer,
  productDetailsReducer,
  productListReducer,
  uploadImgReducer,
} from "./Reducers/productReducers";
import { orderListReducer } from "./Reducers/orderReducers";
import { brandListReducer, createBrandReducer } from "./Reducers/brandReducers";
import { colorListReducer, createCOLORReducer } from "./Reducers/colorReducers";
import {
  categoryListReducer,
  createCategoryReducer,
} from "./Reducers/categoryReducers";
import { dashboardReducer } from "./Reducers/dashboardReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  uploadImg: uploadImgReducer,
  orderList: orderListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  editProduct: editProductReducer,
  createBrand: createBrandReducer,
  brandList: brandListReducer,
  createCategory: createCategoryReducer,
  categoryList: categoryListReducer,
  createColor: createCOLORReducer,
  colorList: colorListReducer,
  dashboard: dashboardReducer,
});

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
