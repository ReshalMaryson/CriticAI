import { Routes, Route } from "react-router-dom";

// components
import Login from "./components/auth/login";
import Profile from "./components/user/profile";
import Header from "./components/header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
