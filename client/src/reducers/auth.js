import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADED_ERROR,
  ADMIN_LOADED,
  AUTH_ERROR,
  ADMIN_LOADED_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  //load the token from the local storage
  token: localStorage.getItem("token"),
  //when the user logged in, the authentication is true
  isAuthenticated: null,
  loading: true,
  user: null,
  admin: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      };
      case ADMIN_LOADED_ERROR: // Handle user load error without clearing token
      if (state.isAuthenticated) {
        // If user was already authenticated, maintain authentication status
        return {
          ...state,
          loading: false,
          user: null,
          admin: null, 
        };
      } else {
        // If user was not authenticated, set isAuthenticated to false
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          admin: null, 
        };
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //if register success,save the token to local storage
      //token is in setItem func is that returned inside storage during registration
      localStorage.setItem("token", payload.token);
      return {
        ...payload,
        isAuthenticated: true,
        loading: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      //for register fail,remove the token from local storage
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
      case USER_LOADED_ERROR: // Handle user load error without clearing token
      if (state.isAuthenticated) {
        // If user was already authenticated, maintain authentication status
        return {
          ...state,
          loading: false,
          user: null,
          admin: null, // Clear admin data as well
        };
      } else {
        // If user was not authenticated, set isAuthenticated to false
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          admin: null, // Clear admin data as well
        };
      }
    
      

    default:
      return state;
  }
}
