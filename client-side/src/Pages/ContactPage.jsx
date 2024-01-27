import React from "react";
import LegalContents from "../Componetns/Features/LegalContents";
import Layout from "../Componetns/Layout/Layout";
import featureStore from "../Store/FeatureStore";

const ContactPage = () => {
  const { legalDetailsRequest } = featureStore();

  useEffect(() => {
    (async () => {
      await legalDetailsRequest("contact");
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default ContactPage;
