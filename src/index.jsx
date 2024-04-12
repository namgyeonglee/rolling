import "./styles/reset.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./Main";
import GlobalStyles from "./styles/GlobalStyle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <GlobalStyles />
      <Main />
    </>
  </React.StrictMode>,
);
