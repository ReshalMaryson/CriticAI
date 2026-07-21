import api from "../../../api/axios";

export const CreateReview=async(code,language)=>{
  try{

    const payload={
      code,
      language
    };
    const res=await api.post("/api/generate",payload);
  console.log(res);
    return{
      success:true,
      data:res.data.message.result
    };

  }catch(err){
    console.log(err);
    throw err;
  }
};