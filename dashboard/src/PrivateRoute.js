import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const Component = { ...props };
  return userInfo && userInfo.role === "admin" ? (
    <Component />
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
