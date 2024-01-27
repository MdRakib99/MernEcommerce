import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Toaster position='bottom-center' reverseOrder={false} />
      <Footer />
    </>
  );
};

export default Layout;
