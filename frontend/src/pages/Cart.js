import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/cartActions";

const Cart = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <>
        <Meta title={"Cart"} />
        <BreadCrumb title="Cart" />
        <Container class1="cart-wrapper home-wrapper-2 py-5">
          {cartItems.length === 0 ? (
            <div className="alert alert-info d-flex justify-content-center align-items-center text-center mt-3">
              <div className="">Your cart is empty</div>
              <Link
                className="btn btn-success  px-5 py-3"
                to="/"
                style={{ fontSize: "12px", marginLeft: "8px" }}
              >
                SHOPPING NOW
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                  <h4 className="cart-col-1">Product</h4>
                  <h4 className="cart-col-2">Price</h4>
                  <h4 className="cart-col-3">Quantity</h4>
                  <h4 className="cart-col-4">Total</h4>
                </div>
                {cartItems.map((item) => (
                  <div
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                    key={item.product}
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item.image}
                          className="img-fluid"
                          alt="product image"
                        />
                      </div>
                      <div className="w-75">
                        <p>{item.title}</p>
                        <p>Size: hgf</p>
                        <p>Color: {item.color}</p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{item.price} đ </h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={item.quantity}
                          id=""
                          value={item.qty}
                          onChange={(e) => {
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            );
                          }}
                        />
                      </div>
                      <div
                        className="remove-cart-item"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <AiFillDelete className="text-danger " />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">{item.qty * item.price}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link to="/product" className="button">
                    Continue To Shopping
                  </Link>
                  <div className="d-flex flex-column align-items-end">
                    <h4>SubTotal: {total} đ</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to="/checkout" className="button">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </>
    </>
  );
};

export default Cart;
