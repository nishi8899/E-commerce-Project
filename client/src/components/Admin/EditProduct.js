import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProduct, getProductById } from "../../actions/product";
import { getCategories } from "../../actions/category";
import { Box,Typography } from "@mui/material";

function EditProduct({
  product: { product, loading },
  updateProduct,
  getProductById,
  auth: { admin },
  getCategories,
  category: { categories },
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: "",
    gender: "",
    category: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data when component mounts
    getProductById(id);
    // Establish WebSocket connection
    const ws = new WebSocket("ws://localhost:4000");
    ws.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "product_update") {
        // Handle product update
        console.log("Received product update:", data.data);
        if (data.data._id === id) {
          // Update product data in the state
          setFormData({
            ...formData,
            name: data.data.name,
            price: data.data.price,
            description: data.data.description,
            gender: data.data.gender,
            images: data.data.images,
            category: data.data.category,
          });
        }
      }
    };
    // Cleanup function
    return () => {
      ws.close();
    };
  }, [id]); // Dependency array to run effect only when ID changes


  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    // Update form data when product or loading state changes
    if (product && !loading) {
      setFormData({
        name: product?.name || "",
        price: product?.price || "",
        description: product?.description || "",
        gender: product?.gender || "",
        images: product?.images || "",
        category: product?.category || "",
      });
    }
  }, [loading, product]);
     //called when the component mounts
 


  const { name, price, description, gender, category } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoto = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(formData, id);
    navigate("/admin/dashboard");
  };

  return (
    <Fragment>
        <Box py={4} px={1}>
     <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        product stand out
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <small className="form-text">Name of product</small>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Price</small>
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Description</small>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Gender</small>
          <select name="gender" value={gender} onChange={(e) => onChange(e)}>
            <option value="0">* Select Gender</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="form-group">
          <small className="form-text">Category</small>
          <select
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <small className="form-text">Product Image</small>
          <input
            type="file"
            placeholder="* Photos"
            accept=".png, .jpg, .jpeg"
            name="images"
            onChange={handlePhoto}
          />
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/admin/dashboard">
            Go Back
          </Link>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/admin/dashboard">
          Go Back
        </Link>
      </form>
      </Box>
    </Fragment>
  );
}

EditProduct.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
  category: state.category,
});

export default connect(mapStateToProps, {
  getProductById,
  updateProduct,
  getCategories,
})(EditProduct);
