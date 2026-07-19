import { Routes, Route } from "react-router-dom";

// components
import Login from "./components/auth/login";
import Profile from "./components/user/profile";
import Header from "./components/header";

import LandingPage from "./components/landingPage/LandingPage";
import Generate from "./components/generate/generate";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<LandingPage/>} />
        <Route path="/generate" element={<Generate/>} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
