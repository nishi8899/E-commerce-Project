import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../actions/order";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

function AdminOrders({ getOrders, order: { orders } }) {
  useEffect(() => {
    getOrders();
  }, [getOrders]);


  return (
    <Fragment>
      <Typography variant="h4">Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.city}</TableCell>
                <TableCell>{order.postalCode}</TableCell>
                <TableCell>{order.country}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, { getOrders })(AdminOrders);
