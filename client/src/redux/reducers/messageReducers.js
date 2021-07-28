import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  CLEAR_MESSAGE,
} from "../constants/messageConstants";

const INITIAL_STATE = {
  successMessage: "",
  errorMessage: "",
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        successMessage: "",
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default messageReducer;
