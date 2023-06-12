import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./Redux/store";
import "bootstrap-icons/font/bootstrap-icons.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
