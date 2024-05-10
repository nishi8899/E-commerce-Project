
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY, CLEAR_CART } from "../actions/types";

const initialState = {
  items: [],
  totalAmount: 0, // Initialize totalAmount to 0
  loading: true,
  error: null,
};

// Calculate total amount of items in the cart when the application loads
initialState.items.forEach(item => {
  initialState.totalAmount += item.price * item.quantity;
});

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, payload],
        totalAmount: state.totalAmount + (payload.price * payload.quantity), // Update totalAmount when adding to cart
        loading: false,
      };
    case REMOVE_FROM_CART:
      const removedItem = state.items.find((item) => item._id === payload);
      return {
        ...state,
        items: state.items.filter((item) => item._id !== payload),
        totalAmount: state.totalAmount - (removedItem.price * removedItem.quantity), // Update totalAmount when removing from cart
        loading: false,
      };
    case UPDATE_CART_ITEM_QUANTITY:
      const updatedItem = state.items.find((item) => item._id === payload.productId);
      const oldItemTotal = updatedItem.price * updatedItem.quantity;
      const newItemTotal = updatedItem.price * payload.quantity;
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === payload.productId ? { ...item, quantity: payload.quantity } : item
        ),
        totalAmount: state.totalAmount - oldItemTotal + newItemTotal, // Update totalAmount correctly
        loading: false,
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        totalAmount: 0, // Reset totalAmount when clearing the cart
        loading: false,
      };
    default:
      return state;
  }
}
