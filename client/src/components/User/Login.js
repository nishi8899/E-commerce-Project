import React, { Fragment, useState } from "react";

import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
const Login = ({ login, isAuthenticated, auth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(formData);
  };
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop">
                <form onSubmit={onSubmit} className="box">
                  <h1 className="large text-primary">Sign In</h1>
                  <p className="lead">
                    <i className="fas fa-user"></i> Sign Into Your Account
                  </p>
                  <div className="field mt-5">
                    <label className="label">Email or Username</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Username"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Password</label>
                    <div className="controls">
                      <input
                        type="password"
                        className="input"
                        placeholder="******"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button className="button is-success is-fullwidth">
                      Login
                    </button>
                  </div>
                  <p className="my-1">
                    Don't have an account <Link to="/register">Sign Up</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});



export default connect(mapStateToProps, { login })(Login);
