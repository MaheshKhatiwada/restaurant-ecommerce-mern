import axios from "../../api/axios";
import { GET_CATEGORIES } from "../constants/categoryConstants";
import { STOP_LOADING, START_LOADING } from "../constants/loadingConstants";
import { ERROR_MESSAGE } from "../constants/messageConstants";

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
