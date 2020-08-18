import React from "react";
import ReactDOM from "react-dom";

import Message from "./Message";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Message button="Click" message="Super legal!!!" />
  </React.StrictMode>,
  rootElement
);
