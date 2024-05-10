import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Product from "./Product";
import { getProducts } from "../../actions/product";
function AdminProduct({ getProducts, product: { products } }) {
  const { keyword } = useParams();
  useEffect(() => {
    getProducts(keyword);
  }, [getProducts, keyword]);
  return (
    <div>
      <Fragment>
        <Product product={products} />
      </Fragment>
    </div>
  );
}

AdminProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //anything in reducer,it well get into this component
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(AdminProduct);
