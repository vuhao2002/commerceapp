import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
} from "../Redux/Constants/orderContants";
import { getOrderDetails, payOrder } from "../Redux/Actions/orderActions";
import axios from "axios";

const Order = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const cartItem = useSelector((state) => state.cart);
  const { shippingAddress } = cartItem;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    navigate("/product");
  };
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/user/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order?.paymentIntent?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const total = addDecimals(
    order?.products.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    )
  );

  const shippingPrice = addDecimals(total > 200000 ? 0 : 30000);
  const orderTotal = addDecimals(Number(total) + Number(shippingPrice));
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
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
                  <p className="mb-0">{order.orderby.firstName}</p>
                  <p className="mb-0">{order.orderby.email}</p>
                </div>
              </div>
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
                  <p className="mb-0">
                    Pay method: {order.paymentIntent.method.COD}
                  </p>
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
                    Address: {order.paymentIntent.method.address}
                  </p>
                  <p className="mb-0"></p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8 mt-4">
                {order.products.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your cart is empty
                  </Message>
                ) : (
                  order.products.map((item) => {
                    return (
                      <div
                        className="d-flex gap-10 mb-3 align-align-items-center"
                        key={item._id}
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                            >
                              {item.count}
                            </span>
                            <img
                              className="img-fluid place-order_img"
                              src={item?.product?.images?.[0].url}
                              alt="product"
                            />
                          </div>
                          <div>
                            <h5 className="total-price">
                              {item?.product?.title}
                            </h5>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total">
                            {item?.product?.price * item.count} đ
                          </h5>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="col-4">
                <>
                  <div className="border-bottom py-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="total">Subtotal</p>
                      <p className="total-price">{total} đ </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 total">Shipping</p>
                      <p className="mb-0 total-price">{shippingPrice} đ </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                    <h4 className="total">Total</h4>
                    <h5 className="total-price">{orderTotal} đ </h5>
                  </div>
                  {order.paymentIntent.method.COD === "PayPal" &&
                  !order?.paymentIntent?.isPaid ? (
                    <div className="d-flex justify-content-center align-items-center border-bootom">
                      {loadingPay && <Loading />}
                      {!sdkReady ? (
                        <Loading />
                      ) : (
                        <PayPalButton
                          amount={orderTotal}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={placeOrderHandler}
                      className="btn btn-primary w-100"
                    >
                      Về trang mua hàng
                    </button>
                  )}
                </>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default Order;
