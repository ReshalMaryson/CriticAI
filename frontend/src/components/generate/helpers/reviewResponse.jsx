import "../../../css/generate/reviewResponse.css";
export default function ReviewResponse({
review,
setReview
}){        
        
return(

<div className="review-result-container">

        <button
        className="back-btn"
        onClick={()=>{
        setReview(null);
        }}
        >
            ← Back To Editor
        </button>

<div className="result-grid">

<div className="result-card score-card">
    <h2>Score</h2>
    <h1 className="score-value">
    {review.score} / 100
    </h1>
    </div>

<div className="result-card">

<h2>Strengths</h2>

        {review.strengths.map((item,index)=>(
        <p key={index}>
        • {item}
        </p>
        ))}

</div>

<div className="result-card">

        <h2>Confirmed Issues</h2>

        {review.confirmedIssues.length>0? review.confirmedIssues.map((item,index)=>(
        <p key={index}>
        • {item}
        </p>
        )):<><p>No Issues Found.</p></>}

</div>

<div className="result-card">

        <h2>Potential Issues</h2>

        {review.potentialIssues.map((item,index)=>(
        <p key={index}>
        • {item}
        </p>
        ))}

</div>

<div className="result-card">

<h2>Security</h2>

        {review.security.map((item,index)=>(
        <p key={index}>
        • {item}
        </p>
        ))}

</div>

<div className="result-card">

        <h2>Performance</h2>

        {review.performance.map((item,index)=>(
        <p key={index}>
        • {item}
        </p>
        ))}

</div>

<div className="result-card">

        <h2>Best Practices</h2>

        {review.bestPractices.map((item,index)=>(
        <p key={index}>
        • {item}
        </p>
        ))}

</div>

    <div className="result-card">
            <h2>Verdict</h2>
            <p>
            {review.verdict}
            </p>
    </div>

    <div className="result-card full-width">

    <h2>Refactored Code</h2>

        <pre>
        <code>
        {review.refactoredCode}
        </code>
        </pre>

    </div>
</div>
</div>

);

}