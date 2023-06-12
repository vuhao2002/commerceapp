import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../Redux/Actions/userActions";
const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  // const toastId = React.useRef(null);

  // const ToastObjects = {
  //   pauseOnFocusLoss: false,
  //   draggable: false,
  //   pauseOnHover: false,
  //   autoClose: 2000,
  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(updateUserProfile("profile"));
  // }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    // password match
    if (password === "" || password !== confirmPassword) {
      alert("Password does not match");
    } else {
      dispatch(resetPasswordUser(token, password));
      alert("Reset password success");
      navigate("/login");
    }
  };
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      {/* <Toast /> */}
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={(e) => submitHandler(e)}
              >
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
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
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

export default Resetpassword;
