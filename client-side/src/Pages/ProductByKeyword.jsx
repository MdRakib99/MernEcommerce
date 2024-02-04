import React, { useEffect } from "react";
import productStore from "../Store/ProductStore";
import Layout from "../Componetns/Layout/Layout";
import { useParams } from "react-router-dom";
import ProductList from "../Componetns/Product/ProductList";

const ProductByKeyword = () => {
  const { listByKeywordRequest } = productStore();
  const { keyword } = useParams();

  useEffect(() => {
    (async () => {
      await listByKeywordRequest(keyword);
    })();
  }, []);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByKeyword;
