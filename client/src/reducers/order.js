import {
    GET_ORDERS,
    ORDERS_ERROR
  } from "../actions/types";
  
  const initialState = {
    orders: [],
    loading: true,
    error: {}
  };
  

  export default function orderReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ORDERS:
        return {
          ...state,
          orders: payload,
          loading: false
        };
      case ORDERS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  