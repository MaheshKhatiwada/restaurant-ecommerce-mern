// import axios from "../../api/axios";
import axios from 'axios'
import { GET_CATEGORIES ,CREATE_CATEGORY} from "../constants/categoryConstants";
import { STOP_LOADING, START_LOADING } from "../constants/loadingConstants";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messageConstants";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get("/api/category");
    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_CATEGORIES, payload: response.data.categories });
  } catch (error) {
    console.log("getcategories error", error);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: ERROR_MESSAGE, payload: error.response.data.errorMsg });
  }
};

export const createCategory = (data) => async (dispatch) => {
  try {
    const config={
      headers:{
          'Content-Type':'application/json',
      },
  }
  dispatch({ type: START_LOADING });
  const response=await axios.post('/api/category',data,config)
  dispatch({ type: STOP_LOADING });
  dispatch({ type: CREATE_CATEGORY, payload: response.data.categories });
  dispatch({type:SUCCESS_MESSAGE,payload:response.data.successMsg})

  } catch (error) {
    console.log("createCategory error", error);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: ERROR_MESSAGE, payload: error.response.data.errorMsg });
  }
};
