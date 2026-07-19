import "../../css/generate/generate.css";
import { useState,useRef,useEffect } from "react";

export default function Generate() {
  const [code,setCode] = useState("");
  const [language,setLanguage] = useState("javascript");
  const [placeholder,setPlaceholder] = useState("");
  const sliderRef = useRef();
useEffect(()=>{

  if(code){
    setPlaceholder("");
    return;
  }

  const text="Paste your code here...";

  let index=0;

  const interval=setInterval(()=>{

    if(index<=text.length){
      setPlaceholder(text.slice(0,index));
      index++;
    }
    else{
      index=0;
      setPlaceholder("");
    }

  },90);

  return()=>clearInterval(interval);

},[code]);


  const recentReviews = [
    {
      title:"Auth Middleware Review",
      language:"Javascript",
      score:85,
      date:"Today"
    },
    {
      title:"User Controller Review",
      language:"Javascript",
      score:72,
      date:"Yesterday"
    },
    {
      title:"API Review",
      language:"Python",
      score:90,
      date:"2 days ago"
    },
    {
      title:"Database Review",
      language:"Java",
      score:78,
      date:"3 days ago"
    }
  ];


  const slide = (direction)=>{
    sliderRef.current.scrollBy({
      left:direction==="right"?300:-300,
      behavior:"smooth"
    });
  };


  return (
    <div className="generate-page">

      <section className="review-container">

        <div className="review-header">
          <h1>Code Review</h1>
          <p>Submit your code and get an AI powered review.</p>
        </div>

        <textarea
          placeholder={placeholder}
          value={code}
          onChange={(e)=>setCode(e.target.value)}
        />

        <div className="review-actions">

          <select
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
          >
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <button>
            Review Code
          </button>

        </div>

      </section>


      <section className="recent-section">

        <h2>
          Recent Reviews
        </h2>

        <div className="recent-wrapper">
{recentReviews.length > 0 ? <> <button
            className="slider-btn"
            onClick={()=>slide("left")}
          >
            ←
          </button>

          <div
            className="reviews-slider"
            ref={sliderRef}
          >
          
            {  recentReviews.map((review,index)=>(
              <div className="review-card" key={index}>
                <h3>{review.title}</h3>

                <p>{review.language}</p>

                <div className="review-info">
                  <span>
                    Score: {review.score}
                  </span>

                  <span>
                    {review.date}
                  </span>
                </div>

              </div>
            ))}

            <button className="more-review">
              More →
            </button>
          </div>
  

          <button
            className="slider-btn"
            onClick={()=>slide("right")}
          >
            →
          </button></>
:<p className="no-reviews">No Recent Reviews</p>}
         
        </div>

      </section>

    </div>
  );
}