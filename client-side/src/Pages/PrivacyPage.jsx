import React, { useEffect } from "react";
import featureStore from "../Store/FeatureStore";
import Layout from "../Componetns/Layout/Layout";
import LegalContents from "../Componetns/Features/LegalContents";

const PrivacyPage = () => {
  const { legalDetailsRequest } = featureStore();

  useEffect(() => {
    (async () => {
      await legalDetailsRequest("privacy");
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};
export default PrivacyPage;
