import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ComposeCompiled from "./pages/Compose/Compose.jsx";
import GenerateMusicCompiled from "./pages/GenerateMusic/GenerateMusic.jsx";
import GenerateUglyCompiled from "./pages/GenerateUgly/GenerateUgly.jsx";
import LandingPageCompiled from "./pages/LandingPage/LandingPage.jsx";
import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageCompiled />
  },
  {
    path: "/compose",
    element: <ComposeCompiled />
  },
  {
    path: "/compose/:genre",
    element: <GenerateMusicCompiled />
  },
  {
    path: "/compose/ugly",
    element: <GenerateUglyCompiled />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
