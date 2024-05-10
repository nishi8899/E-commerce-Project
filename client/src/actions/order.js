import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_ORDERS,
  ORDERS_ERROR
} from "./types";

// Get all orders
export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/getorders");
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
