import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//The private route component is used to protect selected pages in a React app from unauthenticated users.
//...rest of the components that require authentication
//...rest stores number of parameters passed to the component
const PrivateRoute = ({ auth: { isAuthenticated, loading }, ...rest }) => {
  return !isAuthenticated && !loading ? (
    <Navigate to="/login" />
  ) : (
    <element {...rest} />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
