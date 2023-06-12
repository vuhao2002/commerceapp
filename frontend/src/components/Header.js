import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
const Header = () => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart);
  const { cartItems } = cartItem;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [ifUser, setIfUser] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/product`);
    }
  };
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  Dev Corner
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <form className="input-group" onSubmit={submitHandler}>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="input-group-text p-3"
                  id="basic-addon2"
                  type="submit"
                >
                  <BsSearch className="fs-6" />
                </button>
              </form>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  {userInfo ? (
                    <div className="d-flex align-items-center gap-10 text-white">
                      <img src={user} alt="user" />
                      <div className="nav-item dropdown">
                        <button
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={() => {
                            setIfUser(!ifUser);
                          }}
                        >
                          Hi, {userInfo.firstName}
                        </button>
                        <div
                          className={`dropdown-menu ${ifUser ? "d-flex" : ""}`}
                          style={{ flexDirection: "column" }}
                        >
                          <Link
                            to="/profile"
                            className="text-black dropdown-item"
                          >
                            Profile
                          </Link>
                          <Link
                            to="/product"
                            className="text-black dropdown-item"
                            onClick={logoutHandler}
                          >
                            Logout
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex align-items-center gap-10 text-white">
                        <img src={user} alt="user" />
                        <div>
                          <div
                            className=" d-flex"
                            style={{ flexDirection: "column" }}
                          >
                            <Link to="/login" className="text-white">
                              Login
                            </Link>
                            <Link to="/signup" className="text-white">
                              Signup
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white cart position-relative"
                  >
                    <img src={cart} alt="cart" />
                    <div
                      className="d-flex flex-column gap-10 position-absolute"
                      style={{ right: "-16px", top: "-4px" }}
                    >
                      <span className="badge bg-white text-dark cart-border">
                        {cartItems.length}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
