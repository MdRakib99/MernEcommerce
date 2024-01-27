import React, { useEffect } from "react";
import productStore from "../Store/ProductStore";
import { useParams } from "react-router-dom";
import Layout from "../Componetns/Layout/Layout";
import ProductList from "../Componetns/Product/ProductList";

const ProductByBrand = () => {
  const { listByBrandRequest } = productStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await listByBrandRequest(id);
    })();
  }, []);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByBrand;
