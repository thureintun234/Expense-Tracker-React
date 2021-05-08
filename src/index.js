import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";

ReactDom.render(
  <SpeechProvider appId="f12f0bfc-a3de-4412-82e0-a041e2bc2284" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
