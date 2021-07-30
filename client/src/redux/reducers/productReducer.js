import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT
} from "../constants/productConstants";

const INITIAL_STATE = {
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        products: [...action.payload],
      };
    case GET_PRODUCT:
      return {
        product:action.payload,
      };
    case CREATE_PRODUCT:
      return {
        products: [...state.products, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
