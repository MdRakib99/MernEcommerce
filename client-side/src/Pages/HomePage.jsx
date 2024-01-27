import React, { useEffect } from "react";
import Layout from "../Componetns/Layout/Layout";

import productStore from "../Store/ProductStore";
import featureStore from "../Store/FeatureStore";
import Slider from "../Componetns/Product/Slider";
import Categories from "../Componetns/Product/Categories";
import Products from "../Componetns/Product/Products";
import Brands from "../Componetns/Product/Brands";
import Features from "../Componetns/Product/Features";

const HomePage = () => {
  const {
    brandListRequest,
    categoryListRequest,
    sliderListRequest,
    listByRemarkRequest,
  } = productStore();
  const { featureListRequest } = featureStore();

  useEffect(() => {
    (async () => {
      await brandListRequest();
      await sliderListRequest();
      await featureListRequest();
      await categoryListRequest();
      await listByRemarkRequest("new");
    })();
  }, []);
  return (
    <Layout>
      <Slider />
      <Features />
      <Categories />
      <Products />
      <Brands />
    </Layout>
  );
};

export default HomePage;
