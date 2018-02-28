import 'babel-polyfill';
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

console.log('FULL RELOAD');

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
