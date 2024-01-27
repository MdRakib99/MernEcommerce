import React, { useEffect } from "react";
import Layout from "../Componetns/Layout/Layout";
import Details from "../Componetns/Product/Details";
import Brands from "../Componetns/Product/Brands";
import { useParams } from "react-router-dom";
import productStore from "../Store/ProductStore";

const ProductDetails = () => {
  const {
    brandList,
    reviewListRequest,
    productDetailsRequest,
    brandListRequest,
  } = productStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await productDetailsRequest(id),
        reviewListRequest(id),
        brandList === null ? brandListRequest(id) : null;
    })();
  }, []);

  return (
    <Layout>
      <Details />
      <Brands />
    </Layout>
  );
};

export default ProductDetails;
