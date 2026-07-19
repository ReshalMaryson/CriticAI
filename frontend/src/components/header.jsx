import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { logoutAttempt } from "./auth/controllers/authControllers";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <Link to="/" className="logo">
        Critic<span>AI</span>
      </Link>

      <nav className="header-links">
        <Link to="/">Features</Link>
        <Link to="/">How it Works</Link>
        <Link to="/">Pricing</Link>
        <Link to="/">Docs</Link>

        {user ? (
          <>
            <Link to="/generate">Generate</Link>
            <Link to="/profile">Profile</Link>
            <button
              className="logout-btn"
              onClick={() => logoutAttempt(navigate, logout)}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}