import React from "react";
import productStore from "../Store/ProductStore";
import Layout from "../Componetns/Layout/Layout";
import { useParams } from "react-router-dom";

const ProductByCategory = () => {
  const { listByCategoryRequest } = productStore();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await listByCategoryRequest(id);
    })();
  }, []);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByCategory;
