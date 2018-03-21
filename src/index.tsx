import 'babel-polyfill';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

console.log('FULL RELOAD');

ReactDOM.render(
  <div style={{ width: '100%', padding: 0, margin: 0 }}>
    <App />
  </div>,
  document.getElementById("root")
);
