import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/admin");
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></CustomInput>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></CustomInput>
          <div className="mb-3 text-end">
            <Link
              to="/forgot-password"
              className="text-decoration-none text-dark"
            >
              Forgot password?
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 w-100 text-center text-decoration-none fs-5 text-dark"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
