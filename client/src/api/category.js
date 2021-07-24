import axios from "./axios"

export const addCategory=async(data)=>{
    const config={
        headers:{
            'Content-Type':'application/json',
        },
    }
    const response=await axios.post('/api/category',data,config)
    return response;

}