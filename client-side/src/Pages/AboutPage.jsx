import React, { useEffect } from "react";
import Layout from "../Componetns/Layout/Layout";
import LegalContents from "../Componetns/Features/LegalContents";
import featureStore from "../Store/FeatureStore";

const AboutPage = () => {
  const { legalDetailsRequest } = featureStore();

  useEffect(() => {
    (async () => {
      await legalDetailsRequest("about");
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default AboutPage;
