import "../css/header.css";

import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { logoutAttempt } from "./auth/controllers/authControllers";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <h1>header</h1>
        <div className="headerlinks">
          {user ? (
            <>
              {" "}
              <Link
                to="/login"
                onClick={() => {
                  logoutAttempt(navigate, logout);
                  setLoggedInUser(null);
                }}
              >
                logout
              </Link>
              <Link to="/generate">Generate</Link>
            </>
          ) : (
            <a href="/signup">signup</a>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
