import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item, quantity, removeFromCart, updateQuantity }) => {
  const { _id, name, price, images } = item;

  const handleRemoveFromCart = () => {
    removeFromCart(_id);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(_id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      // Check if quantity is greater than 1 before decreasing
      updateQuantity(_id, quantity - 1);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <img
            src={images}
            alt={name}
            style={{ width: "100%", maxWidth: 100 }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Price: ₹{price}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="Remove from cart"
              onClick={handleRemoveFromCart}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleDecreaseQuantity}
            >
              -
            </Button>
            <Typography variant="body1" sx={{ marginX: 1 }}>
              {quantity}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleIncreaseQuantity}
            >
              +
            </Button>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" align="right">
            ₹{(price * quantity).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default CartItem;
