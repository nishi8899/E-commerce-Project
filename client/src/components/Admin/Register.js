import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registerAdmin } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, registerAdmin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    //setting the initial state
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });
  //destructure formData
  const { name, email, password, confPassword } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      alert("Passwords do not match");
    } else {
      registerAdmin({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={(e) => onSubmit(e)} className="box">
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
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
                  <label className="label">Confirm Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      name="confPassword"
                      value={confPassword}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
                <p className="my-1">
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
//mapStateToProps is used to get the state from the redux store
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
//connect is used to connect the component to the redux store
//connect takes two arguments mapStateToProps and an object with all the actions
//connect take two things:any state you wanna map and any actions you wanna use
export default connect(mapStateToProps, { setAlert, registerAdmin })(Register);
