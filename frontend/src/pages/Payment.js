import React, { useState } from "react";
import Container from "../components/Container";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAddApi, savePaymentMethod } from "../Redux/Actions/cartActions";
const Payment = () => {
  const cartItem = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = cartItem;

  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!shippingAddress) {
    navigate("/checkout");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(cartAddApi());
    navigate("/placeorder");
  };

  return (
    <>
      <Container className="blog-wrapper home-wrapper-2 py-5">
        <div className="container d-flex justify-content-center align-items-center">
          <form action="" className="">
            <h6 className="mt-4">Chọn phương thức thanh toán</h6>
            <div className="form-check mt-4">
              <input
                type="radio"
                className="form-check-input"
                value="COD"
                name="payment"
                id="payment1"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="payment1">
                Thanh toán khi nhận hàng
              </label>
            </div>
            <div className="form-check mt-4">
              <input
                type="radio"
                className="form-check-input"
                value="PayPal"
                name="payment"
                id="payment2"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="payment2">
                PayPal or Credit Card
              </label>
            </div>
            <div className="w-100 mt-4 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <Link
                  to="/cart"
                  className="text-dark"
                  style={{ marginRight: "16px" }}
                >
                  <BiArrowBack />
                  Return to Cart
                </Link>
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="button ml-4"
                  style={{ border: "none" }}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Payment;
