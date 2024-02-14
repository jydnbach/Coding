// 1) import the react and reactdom libraries
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 2) get a reference to the div with id root
const el = document.getElementById("root");

//3 tell react to take control of the element
const root = ReactDOM.createRoot(el);

root.render(<App />);
