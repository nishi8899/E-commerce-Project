import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";
import productReducer from "./product";
import categoryReducer from "./category";
import orderReducer from "./order";
import cartReducer from "./cart";
export default combineReducers({ alert, auth:authReducer, product:productReducer, category:categoryReducer, cart: cartReducer, order: orderReducer});
