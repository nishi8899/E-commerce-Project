import React from "react";
import { Link } from "react-router-dom";
function DashboardActions() {
  return (
    <div className="dash-buttons">
      <Link to="/admin/product/add" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Add Product
      </Link>
      <Link to="/admin/category/add" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Add Category
      </Link>
    </div>
  );
}

export default DashboardActions;
