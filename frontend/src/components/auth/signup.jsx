// import "../../css/auth/signup.css";
import "../../css/auth/signup.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// controller
import { signUp } from "./controllers/authControllers";

export default function SignUp() {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // handle form error and send request for sign - up
  async function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      setErrMessage("Missing required fields.");
      return;
    }
    await signUp(navigate, formData, setFormData, setErrMessage, setLoading);
  }

  // clear the message
  useEffect(() => {
    if (!errMessage) return;
    // formData.name = "";
    // formData.email = "";
    // formData.password = "";
    const timer = setTimeout(() => {
      setErrMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [errMessage]);

  return (
    <main className="signup-page">
      <div className="signup-card">
        <p className="signup-brand">
          Critic<span>AI</span>
        </p>

        <h1>Create your account</h1>
        <p className="signup-subtitle">
          Start reviewing your code smarter, in seconds.
        </p>

        <form
          className="signup-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="signup-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="show-errMessage-signup">
            {errMessage && (
              <p
                style={{
                  color:
                    errMessage === "Missing required fields."
                      ? "#ff7e65"
                      : "#c0e687",
                  transition: "100ms",
                  fontSize: "0.8rem",
                }}
              >
                {errMessage}
              </p>
            )}
          </div>
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="signup-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}
