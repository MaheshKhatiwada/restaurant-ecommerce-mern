import axios from "../../api/axios";
import { STOP_LOADING, START_LOADING } from "../constants/loadingConstants";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messageConstants";

export const createProduct=(data)=>async dispatch=>{
    try {
        dispatch({ type: START_LOADING });
        const response=await axios.post('/api/product',data)
        dispatch({ type: STOP_LOADING });
        dispatch({type:SUCCESS_MESSAGE,payload:response.data.successMsg})

    } catch (error) {
        console.log("createProduct error", error);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: ERROR_MESSAGE, payload: error.response.data.errorMsg });
      }
    }
