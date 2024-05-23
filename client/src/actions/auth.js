
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADED_ERROR,
  AUTH_ERROR,
  ADMIN_LOADED_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADMIN_LOADED,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const fetchUserData = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:4000/api/v1/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    return res.data; // Return the data directly
  } catch (err) {
    dispatch({
      type: USER_LOADED_ERROR,
    });
    throw err; // Throw the error
  }
};

//Load Admin
export const fetchAdminData = () => async (dispatch) => {
  //set the header with the token in the local storage
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:4000/api/v1/admin/auth");

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_LOADED_ERROR,
    });
  }
};

//Register USer

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    //config with the header and content type
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //body is the data that we want to send to the server
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        "https://e-commerce-back-end-nishi-singhs-projects.vercel.app/api/v1/register",
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      //after registration,load the user
      //fetchUserData is a function that is used to load the user
      dispatch(fetchUserData());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Register Admin
export const registerAdmin =
  ({ name, email, password }) =>
  async (dispatch) => {
    //config with the header and content type
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //body is the data that we want to send to the server
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/admin/register",
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      //after registration,load the user
      //fetchUserData is a function that is used to load the user
      dispatch(fetchAdminData());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth",
        body,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Login Admin
export const loginAdmin =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/admin/auth",
        body,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(fetchAdminData());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Logout USer
export const logout = () => async (dispatch) => {
  console.log("Logout action called");
  const res = await axios.put("http://localhost:4000/api/v1/logout");

  dispatch({ type: LOGOUT, payload: res.data });
};

//Logout Admin
export const logoutAdmin = () => async (dispatch) => {
  const res = await axios.put("http://localhost:4000/api/v1/admin/logout");

  dispatch({ type: LOGOUT, payload: res.data });
};
