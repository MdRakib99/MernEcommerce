import React, { useEffect } from "react";
import LegalContents from "../Componetns/Features/LegalContents";
import Layout from "../Componetns/Layout/Layout";
import featureStore from "../Store/FeatureStore";

const ComplainPage = () => {
  const { legalDetailsRequest } = featureStore();

  useEffect(() => {
    (async () => {
      await legalDetailsRequest("complain");
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default ComplainPage;
