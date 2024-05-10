import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { getProducts } from "../../actions/product";
import DashboardActions from "./DashboardActions";
import { Box, Typography } from "@mui/material";

function AdminDashboard({ getProducts, product: { products } }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);
  return (
    <Fragment>
      <Box y={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <p className="lead">
          <i className="fas fa-user"></i> Welcome
        </p>

        <DashboardActions />
      </Box>
    </Fragment>
  );
}

AdminDashboard.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //anything in reducer,it well get into this component
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(AdminDashboard);
