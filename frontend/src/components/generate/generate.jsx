import "../../css/generate/generate.css";
import { useState,useRef,useEffect ,useContext} from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

//helper component
import ReviewResponse from "./helpers/reviewResponse";


// controller 
import { CreateReview,RecentReviews,getReviewById } from "./controller/generateController";

export default function Generate() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [review,setReview]=useState(null);
  const [recentReviews,setRecentReview]=useState([]);
  const [code,setCode] = useState("");
  const [language,setLanguage] = useState("javascript");
  const [placeholder,setPlaceholder] = useState("");
  const sliderRef = useRef();
  
  useEffect(()=>{ 
      RecentReviews(setRecentReview); 
  },[])

function spitId(id){
  console.log(id);
}

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


  const slide = (direction)=>{
    sliderRef.current.scrollBy({
      left:direction==="right"?300:-300,
      behavior:"smooth"
    });
  };

 return review ?(<ReviewResponse review={review} setReview={setReview}/>): (
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

          <button
            onClick={async()=>{
              setLoading(true);
              const response=await CreateReview(
                code,
                language
              );
              if(response.success){
                setReview(response.data);
                 RecentReviews(setRecentReview);
              }
              setLoading(false);
            }}
          >
            {loading?"Reviewing...":"Review Code"}
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
              <div className="review-card" key={index} onClick={()=>{getReviewById(review._id,setReview)}}>
                <h3>{review.result.result.title}</h3>

                <p>{review.language}</p>

                <div className="review-info">
                  <span>
                    Score: {review.result.result.score}
                  </span>

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