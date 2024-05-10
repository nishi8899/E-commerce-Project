import {
  GET_PRODUCT,
  GET_PRODUCT_BY_CATEGORY,
  PRODUCT_ERROR,
  CLEAR_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
} from "../actions/types";

const initialState = {
  //product is gonna hold when login it will make a requ and get all the products,also visited other people product,it also get the product
  product: null,
  //product listing page
  products: [],
  repos: [],
  loading: true,
  error: {}, //if there is any error
};


export default function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
    case GET_PRODUCT_BY_CATEGORY:
    case PRODUCT_DETAILS_SUCCESS:
    case UPDATE_PRODUCT:
      return {
        ...state,
        //payload is the data that we get from the backend
        product: payload,
        loading: false,
        resultPerPage: payload.resultPerPage,
      };
      case UPDATE_PRODUCT:
  // Update the products array by filtering out the deleted product
  return {
    ...state,
    products: state.products.filter(product => product._id !== payload._id),
    loading: false,
  };

    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case PRODUCT_ERROR:
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
