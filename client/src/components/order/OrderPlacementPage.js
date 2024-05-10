import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";

const OrderPlacementPage = ({ cartItems, totalAmount }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      try {
        const orderData = constructOrderData();
        // Call the order API first
        const orderResponse = await axios.post(
          "http://localhost:4000/api/v1/order",
          orderData
        );
        const { razorpayOrder, order } = orderResponse.data;

        const orderId = order._id;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: totalAmount,
          currency: "INR",
          name: "E-Commerce Store",
          description: "Payment for your order",
          order_id: razorpayOrder.id,
          callback_url: `http://localhost:4000/api/v1/payment?orderId=${orderId}`,
          prefill: {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#F37254",
          },
        };
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  };

  const constructOrderData = () => {
    return {
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
      },
      items: cartItems,
      totalAmount,
    };
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate each field
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else {
      newErrors.phone = "";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    } else {
      newErrors.address = "";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    } else {
      newErrors.city = "";
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP/Postal Code is required";
      valid = false;
    } else {
      newErrors.zip = "";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
      valid = false;
    } else {
      newErrors.country = "";
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <Box py={4}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order Placement
              </Typography>
              <form>
                <Grid container spacing={2}>
                  {/* Customer Information */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="phone"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="address"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      value={formData.address}
                      onChange={handleChange}
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="city"
                      label="City"
                      variant="outlined"
                      fullWidth
                      value={formData.city}
                      onChange={handleChange}
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="zip"
                      label="ZIP/Postal Code"
                      variant="outlined"
                      fullWidth
                      value={formData.zip}
                      onChange={handleChange}
                      error={!!errors.zip}
                      helperText={errors.zip}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="country"
                      label="Country"
                      variant="outlined"
                      fullWidth
                      value={formData.country}
                      onChange={handleChange}
                      error={!!errors.country}
                      helperText={errors.country}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  totalAmount: state.cart.totalAmount,
});

export default connect(mapStateToProps)(OrderPlacementPage);
