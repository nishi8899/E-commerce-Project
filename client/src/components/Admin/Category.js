import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { deleteCategory } from "../../actions/category";
const Category = ({ category, deleteCategory }) => {
  const categories = category.map((cat) => {
    return (
      <tr key={cat._id}>
        <td>{cat.name}</td>
        <td className="hide-sm">{cat.description}</td>
        <td>
          <Link
            to={`/admin/category/edit/${cat._id}`}
            className="btn btn-light"
          >
            <i className="fas fa-user-circle text-primary"></i> Edit Category
          </Link>
        </td>
        <td>
          <button
            onClick={() => deleteCategory(cat._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
   <Box>
      <Typography variant="h4" gutterBottom>
      Category List
          </Typography>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-sm">Description</th>

            <th className="hide-sm">Edit </th>
            <th className="hide-sm">Delete</th>
            <th />
          </tr>
        </thead>
        <tbody>{categories}</tbody>
      </table>
      </Box>
    </Fragment>
  );
};

Category.propTypes = {
  category: PropTypes.array.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

Category.mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(null, { deleteCategory })(Category);
