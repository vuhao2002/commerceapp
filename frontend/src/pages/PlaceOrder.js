import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import {
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
} from "../Redux/Constants/orderContants";
import { createOrder } from "../Redux/Actions/orderActions";

const PlaceOrder = () => {
  const [coupon, setCoupon] = useState("");
  const cartItem = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cartItem;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      if (paymentMethod === "PayPal") {
        navigate(`/payment-order/${order._id}`);
      } else {
        navigate(`/product`);
      }
    }
  }, [dispatch, success, order]);
  const address = `${shippingAddress.city}, ${shippingAddress.address}`;
  const mobile = shippingAddress.mobile;

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        COD: paymentMethod,
        couponApplied: coupon,
        address: address,
        mobile: mobile,
      })
    );
  };
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const total = addDecimals(
    cartItems.reduce((total, item) => total + item.price * item.qty, 0)
  );

  cartItems.shippingPrice = addDecimals(total > 200000 ? 0 : 30000);
  cartItems.total = addDecimals(
    Number(total) + Number(cartItems.shippingPrice)
  );
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="container d-flex justify-content-center align-items-center alert-success pt-4 pb-4">
          <div className="col-lg-4 col-sm-4 mb-5 mb-sm-0 d-flex">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="bi bi-person-fill"></i>
                </div>
              </div>
            </div>
            <div className="col-md-8 center">
              <h5>
                <strong>Customer</strong>
              </h5>
              <p className="mb-0">{userInfo.firstName}</p>
              <p className="mb-0">{userInfo.email}</p>
            </div>
          </div>
          {shippingAddress && (
            <>
              <div className="col-lg-4 col-sm-4 mb-5 mb-sm-0 d-flex justify-content-center">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="bi bi-truck"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Order info</strong>
                  </h5>
                  <p className="mb-0">Shipping: {shippingAddress.name}</p>
                  <p className="mb-0">Pay method: {paymentMethod}</p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 mb-5 mb-sm-0 d-flex justify-content-end">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 center ">
                  <h5>
                    <strong>Deliver to</strong>
                  </h5>
                  <p className="mb-0">
                    Address: {shippingAddress.city} , {shippingAddress.address}
                  </p>
                  <p className="mb-0"></p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="row">
          <div className="col-8 mt-4">
            {cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              cartItems.map((item) => {
                return (
                  <div
                    className="d-flex gap-10 mb-3 align-align-items-center"
                    key={item.product}
                  >
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item.qty}
                        </span>
                        <img
                          className="img-fluid place-order_img"
                          src={item.image}
                          alt="product"
                        />
                      </div>
                      <div>
                        <h5 className="total-price">{item.title}</h5>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">{item.price * item.qty} đ </h5>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="col-4">
            {cartItems.length === 0 ? null : (
              <>
                <div className="border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="total">Subtotal</p>
                    <p className="total-price">{total} đ </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 total">Shipping</p>
                    <p className="mb-0 total-price">
                      {cartItems.shippingPrice}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                  <h4 className="total">Total</h4>
                  <h5 className="total-price">{cartItems.total} đ </h5>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                  <input
                    type="text"
                    placeholder="mã giảm giá nếu có"
                    className="form-control"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center border-bootom">
                  {cartItems.length === 0 ? null : (
                    <button
                      type="submit"
                      onClick={placeOrderHandler}
                      className="btn btn-primary w-100"
                    >
                      {paymentMethod === "COD"
                        ? "xác nhận đặt hàng"
                        : "Thanh toán qua PayPal"}
                    </button>
                  )}
                  {error && (
                    <div className="my-3 col-12">
                      <Message variant="alert-danger">{error}</Message>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PlaceOrder;
