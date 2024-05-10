import {
  GET_CATEGORY,
  CATEGORY_ERROR,
  UPDATE_CATEGORY,
  CLEAR_CATEGORY,
  GET_CATEGORIES,
  CATEGORIES_DETAILS_FAIL,
  CATEGORIES_DETAILS_SUCCESS,
} from "../actions/types";

const initialState = {
  //category is gonna hold when login it will make a requ and get all the products,also visited other people product,it also get the product
  category: null,
  //category listing page
  categories: [],
  repos: [],
  loading: true,
  error: {}, //if there is any error
};


export default function categoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORY:
    case CATEGORIES_DETAILS_SUCCESS:
    case UPDATE_CATEGORY:
      return {
        ...state,
        //payload is the data that we get from the backend
        category: payload,
        loading: false,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };

    case CATEGORY_ERROR:
    case CATEGORIES_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
