import axios from "axios";

//if the token is in the local storage, set it to the global header,if not it will deleted from the local storage
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
