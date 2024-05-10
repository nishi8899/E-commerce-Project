import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Grid, Button, Box } from "@mui/material";
import CartItem from "./CartItem";
import { removeFromCart, updateQuantity } from "../../actions/cart";
import { useNavigate } from "react-router-dom";

const CartPage = ({
  cartItems,
  totalAmount,
  removeFromCart,
  updateQuantity,
}) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Redirect to order placement page
    navigate("/order-placement");
  };
  return (
    <Box py={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Shopping Cart
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {cartItems?.length === 0 ? (
            <Typography variant="body1">Your cart is empty.</Typography>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                quantity={item.quantity}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))
          )}
        </Grid>

        {cartItems.length > 0 && (
          <>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Total Price: ₹{totalAmount?.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

CartPage.propTypes = {
  cartItems: PropTypes.array.isRequired,
  totalAmount: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  totalAmount: state.cart.totalAmount,
});

const mapDispatchToProps = {
  removeFromCart,
  updateQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
