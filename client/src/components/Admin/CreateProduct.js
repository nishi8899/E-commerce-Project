import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createProduct } from "../../actions/product";
import { getCategories } from "../../actions/category";
import AWS from "../../config/aws.config";
import { Box } from "@mui/material";

function CreateProduct({
  createProduct,
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  const { name, price, description, gender, category } = formData;

  const navigate = useNavigate();
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePhoto = (e) => {
    const files = e.target.files[0];
    const s3 = new AWS.S3();

    const paramas = {
      Bucket: "ecommerce-12",
      Key: "product/" + files.name,
      Body: files,
      ACL: "public-read",
      ContentDisposition: "inline",
      Expire: 10000,
      ContentType: files.type,
    };

    s3.upload(paramas, (err, data) => {
      if (err) {
      } else {
        setFormData({ ...formData, images: data.Location });
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProduct(formData);
    navigate("/admin/dashboard");
  };
  return (
    <Fragment>
      <Box py={4} px={1}>
      <h1 className="large text-primary">Create the Product</h1>
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
          <small className="form-text">Add Price</small>
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <small className="form-text">Add Description</small>
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
              <option key={category._id} value={category._id}>
                {category.name}
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
      </form>
      </Box>
    </Fragment>
  );
}

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { createProduct, getCategories })(
  CreateProduct
);
