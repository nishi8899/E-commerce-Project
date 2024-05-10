import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../actions/product";
import {
  Paper,
  Box,
  Snackbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Product = ({ getProducts, product, deleteProduct }) => {
  const [rowData, setRowData] = useState(product.products);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.price > b.price ? 1 : b.price > a.price ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.price < b.price ? 1 : b.price < a.price ? -1 : 0
        );
    }
  };

  const handleSortRequest = () => {
    setRowData(sortArray(product.products, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  const { keyword } = useParams();
  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when rows per page changes
    getProducts(keyword, 1, newRowsPerPage); // Fetch products for the first page with new rows per page
  };

  // Function to close the snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    setOpenSnackbar(true);
    // Fetch products after deletion
    getProducts(keyword, page + 1, rowsPerPage);
  };
  useEffect(() => {
    // Fetch products when keyword, page, or rowsPerPage change
    getProducts(keyword, page + 1, rowsPerPage);
  }, [keyword, page, rowsPerPage, getProducts]);

  useEffect(() => {}, [product.products]);

  return (
    <Fragment>
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        {product?.products && (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right" onClick={handleSortRequest}>
                      {" "}
                      <TableSortLabel active={true} direction={orderDirection}>
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" onClick={handleSortRequest}>
                      <TableSortLabel active={true} direction={orderDirection}>
                        Price &nbsp;($)
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" onClick={handleSortRequest}>
                      <TableSortLabel active={true} direction={orderDirection}>
                        Description
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Images</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product?.products.map((productItem) => (
                    <TableRow
                      key={productItem._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="productItem">
                        {productItem.name}
                      </TableCell>
                      <TableCell align="right">{productItem.price}</TableCell>
                      <TableCell align="right">
                        {productItem.description}
                      </TableCell>
                      <TableCell align="right">
                        <img
                          src={"http://localhost:4000/" + productItem.images}
                          alt=""
                          className="flex-container"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/admin/product/edit/${productItem._id}`}>
                          <EditIcon />
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteProduct(productItem._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={product.totalItemsCount}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={<div className="mt-3">Rows per page</div>}
            />
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message="Product deleted successfully"
            />
          </>
        )}
      </Box>
    </Fragment>
  );
};

Product.propTypes = {
  product: PropTypes.array.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

Product.mapStateToProps = (state) => ({
  product: state.product.products,
});

export default connect(null, { deleteProduct, getProducts })(Product);
