
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY, CLEAR_CART } from "./types";

export const addToCart = (product) => (dispatch) => {
  const productWithQuantity = { ...product, quantity: 1 }; // Set default quantity to 1
  dispatch({
    type: ADD_TO_CART,
    payload: productWithQuantity,
  });
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
  
    // Check if the cart is empty after removing the item
    const { cart } = getState();
    if (cart.items.length === 0) {
      // Dispatch the CLEAR_CART action if the cart is empty
      dispatch(clearCart());
    }
  };
  

export const updateQuantity = (productId, quantity) => (dispatch) => {
  dispatch({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { productId, quantity },
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};


