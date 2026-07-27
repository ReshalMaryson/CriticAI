import "../../../../css/user/reviewHistory.css";
import { useEffect, useState } from "react";
import ReviewResponse from "../../../generate/helpers/reviewResponse";

// controller
import { userReviews } from "../../../generate/controller/generateController";

export default function ReviewHistory() {
  const [userReview, setUserReviews] = useState([]);
  const [responseKeyword, setresponseKeyword] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  async function loadResources() {
    const response = await userReviews(setUserReviews);
    setresponseKeyword(response);
  }

  useEffect(() => {
    loadResources();
  }, []);

  function toggleExpanded(id) {
    setExpandedId((current) => (current === id ? null : id));
  }

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const datePart = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "2-digit",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${datePart}, ${timePart}`;
  }

  return (
    <div className="review-history-list">
      <p className="heading-history">History</p>
      {userReview.length > 0 ? (
        userReview.map((entry) => {
          const data = entry.result?.result;
          if (!data) return null;

          const isExpanded = expandedId === entry._id;

          return (
            <div key={entry._id} className="review-history-item">
              <div
                className={`review-history-header ${isExpanded ? "active" : ""}`}
                onClick={() => toggleExpanded(entry._id)}
              >
                <span className="review-history-title">{data.title}</span>
                <span className="review-history-language">
                  {entry.language}
                </span>
                <span className="review-history-score">{data.score}</span>
                <span className="review-history-date">
                  {formatDateTime(entry.createdAt)}
                </span>
              </div>

              <div
                className={`review-history-body ${isExpanded ? "active" : ""}`}
              >
                <ReviewResponse review={data} keyword={true} />
              </div>
            </div>
          );
        })
      ) : (
        <h1>Loading Reviews...</h1>
      )}
    </div>
  );
}
