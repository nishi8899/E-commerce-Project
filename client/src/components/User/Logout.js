import React, { useEffect } from "react";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
function Logout({ auth: { isAuthenticated }, logout }) {

  useEffect(() => {
    logout();
  }, [logout]);
  return !isAuthenticated ? <Navigate to="/login" /> : <h1>Login</h1>;
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Logout);
