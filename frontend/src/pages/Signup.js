import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";

import Loading from "../LoadingError/Loading";
import Massage from "../LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/userActions";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/product");
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(firstName, lastName, email, mobile, password));
  };
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              {error && <Massage variant="alert-danger">{error}</Massage>}
              {loading && <Loading />}
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={submitHandler}
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
