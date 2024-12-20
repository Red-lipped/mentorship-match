import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// importing our styling
import "../../public/styles/main.scss";
import App from './App';

// This allows us to use the #root in our index.html to render our React components, starting with the App.tsx file
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);