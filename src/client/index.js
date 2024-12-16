import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/styles/main.scss";
import App from './App.jsx';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);