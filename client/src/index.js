import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./src/store";
import { BrowserRouter } from "react-router-dom";
import GlobalFonts from './src/style-components/fonts/fonts.js'

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
      <GlobalFonts/>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
