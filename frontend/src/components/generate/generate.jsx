import "../../css/generate/generate.css";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

//helper component
import ReviewResponse from "./helpers/reviewResponse";

// controller
import {
  CreateReview,
  RecentReviews,
  getReviewById,
} from "./controller/generateController";

export default function Generate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [recentReviews, setRecentReview] = useState([]);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [placeholder, setPlaceholder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const sliderRef = useRef();

  useEffect(() => {
    RecentReviews(setRecentReview);
  }, []);

  useEffect(() => {
    if (code) {
      setPlaceholder("");
      return;
    }

    const text = "Paste your code here...";

    let index = 0;

    const interval = setInterval(() => {
      if (index <= text.length) {
        setPlaceholder(text.slice(0, index));
        index++;
      } else {
        index = 0;
        setPlaceholder("");
      }
    }, 90);

    return () => clearInterval(interval);
  }, [code]);

  const slide = (direction) => {
    sliderRef.current.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return review ? (
    <ReviewResponse review={review} setReview={setReview} />
  ) : (
    <div className="generate-page">
      <section className="review-container">
        <div className="review-header">
          <h1>Code Review</h1>
          <p>Submit your code and get an AI powered review.</p>
        </div>

        <textarea
          placeholder={placeholder}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {errorMessage && (
          <p
            style={{
              color: "#ff7e65",
              marginTop: "10px",
              textAlign: "center",
              fontSize: "2rem",
              transition: "100ms",
              fontSize: "0.8rem",
            }}
          >
            - {errorMessage} -
          </p>
        )}
        {code ? (
          <>
            <div className="review-actions">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>

              <button
                disabled={loading}
                onClick={async () => {
                  setErrorMessage("");
                  setLoading(true);
                  const response = await CreateReview(
                    code,
                    language,
                    setErrorMessage,
                  );
                  if (response.success) {
                    setReview(response.data);
                    RecentReviews(setRecentReview);
                    setCode("");
                  }
                  setLoading(false);
                }}
                style={
                  loading
                    ? { backgroundColor: "rgb(59, 57, 57)", color: "white" }
                    : { backgroundColor: "white" }
                }
              >
                {loading ? "Reviewing..." : "Review Code"}
              </button>
            </div>
          </>
        ) : null}
      </section>

      <section className="recent-section">
        <h2>Recent Reviews</h2>

        <div className="recent-wrapper">
          {recentReviews.length > 0 ? (
            <>
              {" "}
              <button className="slider-btn" onClick={() => slide("left")}>
                ←
              </button>
              <div className="reviews-slider" ref={sliderRef}>
                {recentReviews.map((review, index) => (
                  <div
                    className="review-card"
                    key={index}
                    onClick={() => {
                      getReviewById(review._id, setReview);
                    }}
                  >
                    <h3>{review.result.result.title}</h3>

                    <p>{review.language}</p>

                    <div className="review-info">
                      <span>Score: {review.result.result.score}</span>

                      {/* <span>
                    {review.createdAt}
                  </span> */}
                      <span>
                        {new Date(review.createdAt).toLocaleString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <Link style={{ textDecoration: "none" }} to={"/profile"}>
                  <button className="more-review">More →</button>
                </Link>
              </div>
              <button className="slider-btn" onClick={() => slide("right")}>
                →
              </button>
            </>
          ) : (
            <p className="no-reviews">No Recent Reviews</p>
          )}
        </div>
      </section>
    </div>
  );
}
