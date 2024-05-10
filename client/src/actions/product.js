import axios from "axios";
import { setAlert } from "./alert";
import { Navigate } from "react-router-dom";
import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  UPDATE_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_BY_CATEGORY,
} from "./types";

//gET CURRENT USERS PRODUCT
export const getCurrentProduct = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/products");
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all products
export const getProducts =
  (keyword = "", page = 1, perPage = 5) =>
  async (dispatch) => {
    //prevent flashing of product when we delete account
    dispatch({ type: CLEAR_PRODUCT });
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/products?keyword=" +
          keyword +
          "&page=" +
          page +
          "&perPage=" +
          perPage
      );

      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get product by id
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:4000/api/v1/admin/products/" + id
    );

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get category from product by category id
export const getProductByCategoryId = (id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/products/" + id);

    dispatch({
      type: GET_PRODUCT_BY_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or update product

export const createProduct =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        "http://localhost:4000/api/v1/admin/products/new",
        formData,
        config
      );

      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Product Updated" : "Product Created", "success")
      );

      if (!edit) {
        <Navigate to="/admin/dashboard" />;
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const updateProduct = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      "http://localhost:4000/api/v1/admin/products/" + id,
      formData,
      config
    );

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/v1/admin/products/${id}`
    );
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert("Product Removed", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
