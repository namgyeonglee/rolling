import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./Main.jsx";
import { GlobalStyles } from "./styles/GlobalStyle.js";
import "./styles/reset.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyles />
    <Main />
  </>,
);
