import axios from "axios"

export const writePrescription=async ()=>{
let res=await axios.post(process.env.API_URL+"appointment/write-prescription",{

}).then((res:any)=>{
    return {appointment:res.data.appointment};
}).catch((err:any)=>{
    return {
        error:true,
        err_code:err.response.status,
        message:err.response.data.message
    };
});
return res;
}