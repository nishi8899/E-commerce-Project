import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCategory } from "../../actions/category";
import { Box } from "@mui/material";

function CreateCategory({ createCategory }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = formData;

  const navigate = useNavigate();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCategory(formData);
    navigate("/admin/dashboard");
  };
  return (
    <Fragment>
      <Box py={4} px={1}>
        <h1 className="large text-primary">Create the Category</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your category stand out
        </p>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <small className="form-text">Name of category</small>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group">
            <small className="form-text">Add Description</small>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/admin/dashboard">
            Go Back
          </Link>
        </form>
      </Box>
    </Fragment>
  );
}

CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

export default connect(null, { createCategory })(CreateCategory);
