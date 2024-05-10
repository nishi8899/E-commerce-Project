import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCategory, getCategoryById } from "../../actions/category";
import { Box, Typography, TextField, Button } from "@mui/material";

function EditCategory({
  category: { category, loading },
  updateCategory,
  getCategoryById,
  auth: { user },
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    getCategoryById(id);
  }, [id]);

  useEffect(() => {
    setFormData({
      name: loading || !category.name ? "" : category.name,
      description: loading || !category.description ? "" : category.description,
    });
  }, [category]);

  const { name, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateCategory(formData, id);
    navigate("/admin/dashboard");
  };

  return (
    <Fragment>
      <Box py={4} px={1} 
      
      >
        <Typography variant="h4" gutterBottom>
          Edit Category
        </Typography>
        <Typography variant="body1">
          Let's get some information to make your category stand out
        </Typography>
  
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            type="text"
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
          <TextField
            type="text"
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => onChange(e)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Link to="/admin/dashboard">
            <Button variant="outlined" color="secondary">
              Go Back
            </Button>
          </Link>
        </form>
      </Box>
    </Fragment>
  );
}

EditCategory.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  getCategoryById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateCategory, getCategoryById })(
  EditCategory
);
