import api from "../../../api/axios";

// generate a review
export const CreateReview=async(code,language,setErrorMessage)=>{
  try{

    const payload={
      code,
      language
    };
    const res=await api.post("/api/generate",payload);
    if(res.status == 200){
    setErrorMessage("");
      return{
          success:true,
          data:res.data.message.result
        };
      }
    
  }catch(err){
    const status = err.response?.status;

    if (status === 504) {
      setErrorMessage("The review is taking longer than expected. Please try again.");
    } else if (status === 429) {
      setErrorMessage(err.response?.data?.message || "Too many requests. Please slow down.");
    } else if (status === 413) {
      setErrorMessage(err.response?.data?.message || "Your code is too long.");
    } else if (status === 500) {
      setErrorMessage("Something went wrong while generating the review.");
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    return { success: false };
  }
};


// get the recent reviews
export const RecentReviews = async (setRecentReview) => {
  try {
    const res = await api.get("/reviews/recent");
    if(res){
      // console.log( res.data.data);
    setRecentReview(res.data.data);
    }
  } catch (err) {
    throw err;
  }
};

// get all reviews of logged in user
export const userReviews = async (setUserReview, setMessage, page = 1, append = false) => {
  try {
    const res = await api.get(`/reviews/user?page=${page}`);

    if (res.data.records === 0 && page === 1) {
      setMessage(res.data.message);
      return { success: true, hasMore: false };
    }

    if (append) {
      setUserReview((prev) => [...prev, ...res.data.data]);
    } else {
      setUserReview(res.data.data);
    }

    const hasMore = page < res.data.totalPages;

    return { success: true, hasMore, currentPage: res.data.currentPage };

  } catch (err) {
    throw err;
  }
};

// get review by id
export const getReviewById=async(id,setReview)=>{
  try{
    const res=await api.get(`/reviews/${id}`);
    // console.log(res.data.data.result.result);
    setReview(res.data.data.result.result);  
   }catch(err){
    throw err;
  }
}