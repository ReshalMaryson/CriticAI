import "../../css/login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { loginAttempt } from "./controllers/authControllers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const userCredentials = {
    email: email.trim(),
    password: password.trim(),
  };

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
          Analyze your code, detect vulnerabilities,
          and improve your architecture with an AI
          senior engineer mindset.
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

          <button
            type="button"
            onClick={() => {
              loginAttempt(userCredentials, navigate, login);
            }}
          >
            Login
          </button>

          <div className="divider">
            OR
          </div>

          <button type="button" className="google-btn">
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}