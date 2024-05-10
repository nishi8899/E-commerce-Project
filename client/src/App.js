import "./App.css";
import Home from "./components/Home/Home";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/Admin/Login";
import AdminLogout from "./components/Admin/Logout";
import AdminRegister from "./components/Admin/Register";
import HomeLayout from "./components/layout/HomeLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./components/Home/Dashboard";
import AdminDashboard from "./components/Admin/Dashboard";
import Products from "./components/products/Products";
import Search from "./components/search/Search";
import AdminProduct from "./components/Admin/AdminProduct";
import AdminCategory from "./components/Admin/AdminCategory";
import AdminOrders from "./components/Admin/AdminOrders.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { fetchUserData, fetchAdminData } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import CreateProduct from "./components/Admin/CreateProduct";
import EditProduct from "./components/Admin/EditProduct";
import CreateCategory from "./components/Admin/CreateCategory";
import EditCategory from "./components/Admin/EditCategory";
import Logout from "./components/User/Logout";
import EachCategory from "./components/products/EachCategory";
import PrivateUserRoute from "./components/routing/PrivateUserRoute";
import CartPage from "./components/cart/CartPage";
import OrderPlacementPage from "./components/order/OrderPlacementPage";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(fetchUserData(), fetchAdminData());
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<HomeLayout />} />
            <Route exact path="/about" element={<h1>About</h1>} />
            <Route exact path="/contact" element={<h1>Contact</h1>} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route
              exact
              path="/products"
              element={
                <PrivateUserRoute>
                  <Products />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              exact
              path="/products/:keyword"
              element={
                <PrivateUserRoute>
                  <Products />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              exact
              path="/search"
              element={
                <PrivateUserRoute>
                  <Search />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              exact
              path="/category/:id"
              element={
                <PrivateUserRoute>
                  <EachCategory />
                </PrivateUserRoute>
              }
            ></Route>

            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/order-placement" element={<OrderPlacementPage />} />
          </Route>
          <Route exact path="/admin" element={<Admin />}>
            <Route index element={<AdminLayout />} />
            <Route exact path="/admin/login" element={<AdminLogin />} />
            <Route exact path="/admin/register" element={<AdminRegister />} />
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
            <Route exact path="/admin/products" element={<AdminProduct />} />
            <Route exact path="/admin/orders" element={<AdminOrders />} />
            <Route exact path="/admin/logout" element={<AdminLogout />} />
            <Route exact path="/admin/categories" element={<AdminCategory />} />
            <Route
              exact
              path="/admin/product/add"
              element={<CreateProduct />}
            />
            <Route
              exact
              path="/admin/product/edit/:id"
              element={<EditProduct />}
            />
          </Route>
          <Route
            exact
            path="/admin/category/add"
            element={<CreateCategory />}
          />
          <Route
            exact
            path="/admin/category/edit/:id"
            element={<EditCategory />}
          />

          <Route exact path="*" element={<h1>404 Not Found</h1>}></Route>
        </Routes>
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
