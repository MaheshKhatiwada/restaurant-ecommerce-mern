import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loadingReducer from "./reducers/loadingReducers";
import messageReducer from "./reducers/messageReducers";
import categoryReducer from "./reducers/categoryReducers";
import productReducer from "./reducers/productReducer";

const reducers = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  categories:categoryReducer,
  products:productReducer
});

const middleware = [thunk];
const initialState = {};
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
