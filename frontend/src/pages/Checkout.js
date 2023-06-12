import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Redux/Actions/cartActions";

const Checkout = () => {
  const cartItem = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cartItem;

  const [name, setName] = useState(shippingAddress.name || "");
  const [mobile, setMobile] = useState(shippingAddress.mobile || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, mobile, city, address);
    dispatch(
      saveShippingAddress({
        name: name,
        mobile: mobile,
        city: city,
        address: address,
      })
    );
    navigate("/payment");
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
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Địa chỉ cụ thể"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button
                      type="submit"
                      onClick={submitHandler}
                      className="button"
                      style={{ border: "none" }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartItems.map((item) => {
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
                          className="img-fluid"
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
              })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">{total} đ </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">{cartItems.shippingPrice} đ </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">{cartItems.total} đ </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
