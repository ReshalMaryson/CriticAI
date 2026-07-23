import api from "../../../api/axios";

export const CreateReview=async(code,language)=>{
  try{

    const payload={
      code,
      language
    };
    const res=await api.post("/api/generate",payload);
    return{
      success:true,
      data:res.data.message.result
    };

  }catch(err){
    throw err;
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

// get review by id
export const getReviewById=async(id,setReview)=>{
  try{
    const res=await api.get(`/reviews/${id}`);
    console.log(res.data.data.result.result);
    setReview(res.data.data.result.result);  
   }catch(err){
    throw err;
  }
}