import "../../css/auth/login.css";

import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useGoogleLogin } from "@react-oauth/google";

// Controllers
import {
  loginAttempt,
  googleLoginAttempt,
} from "./controllers/authControllers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const userCredentials = {
    email: email.trim(),
    password: password.trim(),
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await googleLoginAttempt(tokenResponse.access_token, navigate, login);
    },
    onError: () => console.log("Google login failed"),
  });

  // handle login errors
  async function handlelogin() {
    setErrorMessage(""); // clear old error first
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Missing required fields.");
      return;
    }
    await loginAttempt({ email, password }, navigate, login, setErrorMessage);
  }

  // clear the message
  useEffect(() => {
    if (!errMessage) return;
    setEmail("");
    setPassword("");
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [errMessage]);

  return (
    <div className="login-page">
      <div className="login-brand">
        <h1>
          Critic<span>AI</span>
        </h1>

        <h2>
          Code reviews
          <br />
          powered by intelligence.
        </h2>

        <p>
          Analyze your code, detect vulnerabilities, and improve your
          architecture with an AI senior engineer mindset.
        </p>

        <div className="terminal">
          <p>&gt; Reviewing authentication.js</p>
          <p className="success">✓ Security scan completed</p>
          <p className="success">✓ Logic analysis completed</p>
          <p className="success">✓ Improvements generated</p>
        </div>
      </div>

      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Login to continue reviewing code.</p>

        <form>
          <label>Email</label>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="show-errMessage">
            {errMessage && (
              <p
                style={{
                  color:
                    errMessage === "Missing required fields."
                      ? "#fc5744"
                      : "#c0e687",
                  transition: "100ms",
                  fontSize: "0.8rem",
                }}
              >
                {errMessage}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              handlelogin();
            }}
          >
            Login
          </button>
          <div className="divider">OR</div>
          {/* google auth button */}
          <button type="button" className="google-btn" onClick={googleLogin}>
            Continue with Google
          </button>{" "}
        </form>
        <div className="sign-up-message">
          <p>
            dont have an account?{" "}
            <Link to={"/signup"} style={{ color: "white" }}>
              Sign-Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
