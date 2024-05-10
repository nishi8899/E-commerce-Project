import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByCategoryId } from "../../actions/product";
import { addToCart as addToCartAction } from "../../actions/cart";
import { useDispatch } from "react-redux";
import { Snackbar, Box, Button } from "@mui/material";

const EachCategory = ({
  getProductByCategoryId,
  product: { product },
  addToCart,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState({}); // State to track which products are added to cart

  useEffect(() => {
    getProductByCategoryId(id);
  }, [id, getProductByCategoryId]);

  // Function to handle adding the product to the cart
  const handleAddToCart = (productId) => {
    // dispatch(
    //   addToCartAction({
    //     _id: productId,
    //     name: product.find((p) => p.id === productId).name,
    //     price: product.find((p) => p.id === productId).price,
    //     images: product.find((p) => p.id === productId).images,
    //   })
    // );
    // setAddedToCart((prevState) => ({
    //   ...prevState,
    //   [productId]: true, // Marking the product as added to cart
    // }));
    console.log("Add to cart clicked");
  };

  // Function to navigate to the cart page
  const goToCart = () => {
    // navigate("/cart");
    console.log("Go to cart clicked");
  };

  // Function to close the snackbar
  const handleCloseSnackbar = () => {};

  return (
    <Fragment>
      <Box py={4} px={1}>
        <h2 className="large text-primary-2">Product based on Category Details</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="hide-sm">Description</th>
              <th className="hide-sm">Price</th>
              <th className="hide-sm">Add to Cart</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {product &&
              product.map((prod) => (
                <tr key={prod.id}>
                  <td className="hide-sm">{prod.name}</td>
                  <td className="hide-sm">{prod.description}</td>
                  <td className="hide-sm">₹{prod.price}</td>
                  <td className="hide-sm">
                    {addedToCart[prod.id] ? (
                      <Button variant="contained" color="primary" onClick={goToCart}>
                        Go To Cart
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" onClick={() => handleAddToCart(prod.id)}>
                        Add To Cart
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Snackbar for showing the product added to cart message */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={false}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Product added to cart"
        />
      </Box>
    </Fragment>
  );
};

EachCategory.propTypes = {
  getProductByCategoryId: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, {
  getProductByCategoryId,
  addToCart: addToCartAction,
})(EachCategory);
