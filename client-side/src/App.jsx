import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductByBrand from "./Pages/ProductByBrand";
import ProductByCategory from "./Pages/ProductByCategory";
import ProductByKeyword from "./Pages/ProductByKeyword";
import ProductDetails from "./Pages/ProductDetails";
import AboutPage from "./Pages/AboutPage";
import ComplainPage from "./Pages/ComplainPage";
import HowToBuyPage from "./Pages/HowToBuyPage";
import PrivacyPage from "./Pages/PrivacyPage";
import RefundPage from "./Pages/RefundPage";
import TermsPage from "./Pages/TermsPage";
import LoginPage from "./Pages/LoginPage";
import OtpPage from "./Pages/OtpPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/by-brand/:id' element={<ProductByBrand />} />
        <Route path='/by-category/:id' element={<ProductByCategory />} />
        <Route path='/by-keyword/:keyword' element={<ProductByKeyword />} />
        <Route path='/details/:id' element={<ProductDetails />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/complain' element={<ComplainPage />} />
        <Route path='/how-to-buy' element={<HowToBuyPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/refund' element={<RefundPage />} />
        <Route path='/terms' element={<TermsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/otp' element={<OtpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
