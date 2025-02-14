import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/layout.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

