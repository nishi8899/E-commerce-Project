import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
//initialState is an empty array.
const initialState = [];

const reducer = function (state = initialState, action) {
  //action is an object that contains the type and payload.
  //type is an object that contains the type of action.
  //payload is an object that contains the data.
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      //if the type is SET_ALERT then return the state with the payload added.
      return [...state, payload];
    case REMOVE_ALERT:
      //remove the specific alert from the state
      //FIlter is the process of looping through an array and including or excluding elements inside that array based on a condition that you provide.
      //only filter out the alert that does not match the payload.
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default reducer;
