import axios from "axios";
import { setAlert } from "./alert";
import { Navigate } from "react-router-dom";
import {
  GET_CATEGORY,
  CATEGORY_ERROR,
  UPDATE_CATEGORY,
  GET_CATEGORIES,
  CATEGORIES_DETAILS_FAIL,
  CATEGORIES_DETAILS_SUCCESS,
} from "./types";

//gET CURRENT USERS CATEGORY
export const getCurrentCategory = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/category");
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all Categorys
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/category");

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Categorys Details
export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/category/${id}`);

    dispatch({
      type: CATEGORIES_DETAILS_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get category by id
export const getCategoryById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/api/v1/admin/category/" + id
    );

    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//create or update category

export const createCategory =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:4000/api/v1/admin/category/new",
        formData,
        config
      );

      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Category Updated" : "Category Created", "success")
      );

      if (!edit) {
        <Navigate to="/admin/dashboard" />;
      }
    } catch (err) {
      console.error("err", err);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: CATEGORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const updateCategory = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      "http://localhost:4000/api/v1/admin/category/" + id,
      formData,
      config
    );

    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/v1/admin/category/${id}`
    );
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert("Category Removed", "success"));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
