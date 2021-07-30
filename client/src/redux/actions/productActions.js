import axios from "../../api/axios";
import { STOP_LOADING, START_LOADING } from "../constants/loadingConstants";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/messageConstants";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
} from "../constants/productConstants";

export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.post("/api/product", data);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: CREATE_PRODUCT, payload: response.data.product });
    dispatch({ type: SUCCESS_MESSAGE, payload: response.data.successMsg });
  } catch (error) {
    console.log("createProduct error", error);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: ERROR_MESSAGE, payload: error.response.data.errorMsg });
  }
};
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get("/api/product");
    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_PRODUCTS, payload: response.data.products });
  } catch (error) {
    console.log("getProducts error", error);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: ERROR_MESSAGE, payload: error.response.data.errorMsg });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.delete(`/api/product/${productId}`);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: DELETE_PRODUCT, payload: response.data});
  } catch (error) {
    console.log("deleteProduct error", error);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: ERROR_MESSAGE, payload: error.response.data.errorMsg });
  }
};
