import "../css/header.css";
import menuIcon from "../assets/images/hamburger.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { logoutAttempt } from "./auth/controllers/authControllers";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <Link to="/" className="logo">
        Critic<span>AI</span>
      </Link>

      <button
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <img src={menuIcon} alt="" />
      </button>

      <div
        className={`nav-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      ></div>

      <nav className={`header-links ${menuOpen ? "open" : ""}`}>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>

        {user ? (
          <>
            <Link to="/generate" onClick={closeMenu}>
              Generate
            </Link>
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
            <button
              className="logout-btn"
              onClick={() => {
                closeMenu();
                logoutAttempt(navigate, logout);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn" onClick={closeMenu}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
