import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import Loading from "../LoadingError/Loading";
import Massage from "../LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../Redux/Actions/userActions";
import { listMyOrders } from "../Redux/Actions/orderActions";

const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [mobile, setMobile] = useState(userInfo?.mobile || "");
  const [address, setAddress] = useState(userInfo?.address || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeStatus, setChangeStatus] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          email,
          mobile,
          address,
          password,
        })
      );
      alert("Update Profile Success");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          email,
          mobile,
          address,
        })
      );
      alert("Update Profile Success");
    }
  };

  const handleChangeProfile = () => {
    setChangeStatus(false);
  };
  const showOrderList = () => {
    setChangeStatus(true);
  };

  return (
    <>
      <Container className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="card col-2">
            <ul className="list-group list-group-flush">
              <button
                className="list-group-item "
                onClick={handleChangeProfile}
              >
                PROFILE SETTINGS
              </button>
              <button
                className="list-group-item d-lex justify-content-between"
                onClick={showOrderList}
              >
                ORDER LIST{" "}
                <span className="badge2">{orders ? orders.length : 0}</span>
              </button>
            </ul>
          </div>

          <div className="col-10 mb-4">
            {!changeStatus ? (
              <div className="auth-card">
                <h3 className="text-center mb-3">Profile User</h3>
                {error && <Massage variant="alert-danger">{error}</Massage>}

                {loading && <Loading />}
                <form
                  action=""
                  className="d-flex flex-column gap-15"
                  onSubmit={(e) => submitHandler(e)}
                >
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : loadingOrders ? (
              <Loading />
            ) : errorOrders ? (
              <Massage variant="alert-danger">{error}</Massage>
            ) : orders.length === 0 ? (
              <div className="col-10 alert alert-info text-center mt-3">
                No Orders
                <Link
                  className="btn btn-success mx-2 px-3 py-2"
                  to="/product"
                  style={{ fontSize: "12px" }}
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${
                        order.paymentIntent.isPaid ||
                        order.orderStatus === "Delivered"
                          ? "alert-success"
                          : "alert-danger"
                      }`}
                      key={order._id}
                    >
                      <td>
                        <Link
                          to={`/payment-order/${order._id}`}
                          className="link"
                        >
                          {order._id}
                        </Link>
                      </td>
                      <td>
                        {order.paymentIntent.isPaid ? "Paid" : "Not Paid"}
                      </td>
                      <td>{moment(order.updatedAt).calendar()}</td>
                      <td>{order.paymentIntent.amount} đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
