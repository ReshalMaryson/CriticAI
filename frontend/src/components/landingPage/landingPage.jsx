import { useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../css/landingPage/landingPage.css";
import { AuthContext } from "../../context/authContext";

// helper component
import AnimatedHeadline from "./helper/headingCarosal";

export default function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (location.state?.reloadAfterLogin) {
      navigate("/", { replace: true, state: null });
      window.location.reload();
    }
  }, [location.state, navigate]);

  return (
    <>
      <div className="landing">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-left">
            <div className="badge">AI POWERED CODE REVIEW</div>
            <AnimatedHeadline />
            <p>
              CriticAI analyzes your code like a senior engineer. Find hidden
              bugs, security issues, and improve your architecture before
              production.
            </p>

            <div className="buttons">
              <Link to={user ? "/generate" : "/login"} className="primary">
                Start Reviewing
              </Link>

              {/* <button className="secondary">Explore</button> */}
            </div>
          </div>

          {/* AI Preview */}

          <div className="review-card">
            <div className="window-bar">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="code">
              <pre>
                {`exports.Generate = async (req, res) => 
{
try {
    const {code, language} = req.body;  
      if(!code ||code.trim()===""){
        res.status(400).json({
          status:false,
          message:"code and lanuage are
          required",
          error:"invalid request body"
        })}
}`}
              </pre>
            </div>

            <div className="analysis">
              <div className="score">
                <strong>7.5</strong>

                <small>/10</small>
              </div>

              <div>
                <h3>Code Review</h3>
                <p>Found 3 issues</p>
              </div>
            </div>

            <div className="issue">
              <span>⚠</span>
              Missing pagination can affect scalability.
            </div>

            <div className="issue">
              <span>⚠</span>
              Possible sensitive data exposure.
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="marquee">
            <div className="marquee-track">
              {/* First set */}
              <div className="feature">
                <h3>Deep Analysis</h3>
                <p>Detect bugs and logical problems beyond syntax.</p>
              </div>
              <div className="feature">
                <h3>Security First</h3>
                <p>Identify vulnerabilities before attackers do.</p>
              </div>
              <div className="feature">
                <h3>Better Architecture</h3>
                <p>Improve scalability and clean code.</p>
              </div>

              {/* Duplicate set — creates the seamless loop illusion */}
              <div className="feature">
                <h3>Deep Analysis</h3>
                <p>Detect bugs and logical problems beyond syntax.</p>
              </div>
              <div className="feature">
                <h3>Security First</h3>
                <p>Identify vulnerabilities before attackers do.</p>
              </div>
              <div className="feature">
                <h3>Better Architecture</h3>
                <p>Improve scalability and clean code.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
