import { Routes, Route } from "react-router-dom";

// components
import Login from "./components/auth/login";
import Profile from "./components/user/profile/profile";
import Header from "./components/header";

import LandingPage from "./components/landingPage/LandingPage";
import Generate from "./components/generate/generate";
import RequireAuth from "./components/middleware/requireAuth";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/generate" element={<Generate />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
