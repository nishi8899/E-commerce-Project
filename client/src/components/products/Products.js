import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProductItem from "./ProductItem";
import { getProducts } from "../../actions/product";
import { TablePagination, CircularProgress,Typography } from "@mui/material";

function Products({ getProducts, product: { products, loading } }) {
  const { keyword } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when rows per page changes
    getProducts(keyword, 1, newRowsPerPage); // Fetch products for the first page with new rows per page
  };

  useEffect(() => {
    // Fetch products when keyword, page, or rowsPerPage change
    getProducts(keyword, page + 1, rowsPerPage);
  }, [keyword, page, rowsPerPage, getProducts]);

  return (
    <Fragment>
      <div>
      <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with more
          products
        </p>
        <div className="products-grid">
          {loading ? (
            <div className="loading-spinner">
              <CircularProgress />
            </div>
          ) : products && products?.products?.length > 0 ? (
            products?.products?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <div className="no-products-found">
              <h4>No products found...</h4>
            </div>
          )}
        </div>
      </div>

      <TablePagination
        component="div"
        count={products.totalItemsCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage={<div className="mt-3">Rows per page</div>}
      />
    </Fragment>
  );
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(Products);
