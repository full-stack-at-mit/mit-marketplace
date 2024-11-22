import React from "react";
import Navbar from "./Navbar";
import "../stylesheets/Layout.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
