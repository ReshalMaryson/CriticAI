import api from "../../../api/axios";

// send code and crate repsonse
export const CreateReview=async(code,language)=>{
  console.log(code);
  console.log(language);

  // request
  try{
   const payload={
        code:code,
        language:language
    }

    const res=await api.post("/api/generate",payload);
    
    console.log(res);
    

  }catch(err){
    console.log(err);
    
  }


}
