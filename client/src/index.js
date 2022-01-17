import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import './index.css';

const div = document.createElement("div");
document.body.appendChild(div);

const Application = <App />;
ReactDOM.render(Application, div);
