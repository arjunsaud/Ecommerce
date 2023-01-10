import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./assets/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {store} from "./config/store"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
