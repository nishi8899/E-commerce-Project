//It is a alert action that is used to set the alert.
//The alert is set to an object that contains the msg and alertType.
import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";
export const setAlert = (msg, alertType) => (dispatch) => {
  //uuid4 is used to generate a random id.
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    //payload is an object that contains the msg,alertType and id.
    //whatever is passed in the setAlert function will be passed in the payload.
    payload: { msg, alertType, id },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
