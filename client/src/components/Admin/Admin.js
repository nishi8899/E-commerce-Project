import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
