import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import Category from "./Category";
import { getCategories } from "../../actions/category";
function AdminCategory({ getCategories, category: { categories } }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);
  return (
    <div>
      <Fragment>
        <Category category={categories} />
      </Fragment>
    </div>
  );
}

AdminCategory.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //anything in reducer,it well get into this component
  category: state.category,
});

export default connect(mapStateToProps, { getCategories })(AdminCategory);
