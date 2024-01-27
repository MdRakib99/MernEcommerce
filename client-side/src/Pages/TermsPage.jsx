import React from "react";
import Layout from "../Componetns/Layout/Layout";
import LegalContents from "../Componetns/Features/LegalContents";
import featureStore from "../Store/FeatureStore";

const TermsPage = () => {
  const { legalDetailsRequest } = featureStore();

  useEffect(() => {
    (async () => {
      await legalDetailsRequest("terms");
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default TermsPage;
