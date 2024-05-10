import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Snackbar,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../../actions/cart";
import { useNavigate } from "react-router-dom";

const ProductItem = ({
  product: { _id, name, price, description, images, category },
}) => {
  const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions
  const navigate = useNavigate(); // Initialize useNavigate hook to navigate to different pages
  const [isAdded, setIsAdded] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    dispatch(addToCartAction({ _id, name, price, images })); // Dispatch addToCart action
    setIsAdded(true);
    setOpenSnackbar(true);
  };

  // Function to navigate to the cart page
  const goToCart = () => {
    navigate("/cart"); // Redirect to the cart page
  };

  // Function to close the snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card className="product">
      <div className="product-image">
        <img
          src={images || "no-image-found.png"}
          alt=""
          className="ideal-image"
        />
      </div>
      <CardContent>
        <h2 className="product-name">{name}</h2>
        <div className="product-description">
          <h3>
            <strong>Description</strong>
          </h3>
          <p>{description}</p>
        </div>
        <div className="product-info">
          <h2 className="product-price">
            <strong>Price:</strong> ₹{price}
          </h2>
          <div className="product-category">
            <h3>
              <strong>Category:</strong> {category.name}
            </h3>
          </div>
        </div>
      </CardContent>
      <CardActions>
        {isAdded ? (
          <Button variant="contained" color="primary" onClick={goToCart}>
            Go To Cart
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        )}
      </CardActions>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Product added to cart"
      />
    </Card>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
