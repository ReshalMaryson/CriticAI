import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <GoogleOAuthProvider clientId="47429912232-d0ge02cobc3vofnen9th8ocqobr6t0kl.apps.googleusercontent.com">
    <BrowserRouter>
      <AuthProvider>
        <App />,
      </AuthProvider>
      ,
    </BrowserRouter>
    ,
  </GoogleOAuthProvider>,
  // </StrictMode>,
);
