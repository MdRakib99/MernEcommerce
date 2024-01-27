import React from "react";
import Parse from "html-react-parser";
import LegalContentSkeleton from "../../LoadingSkeleton/LegalContentSkeleton";
import featureStore from "../../Store/FeatureStore";

const LegalContents = () => {
  const { legalDetails } = featureStore();

  if (legalDetails === null) {
    return <LegalContentSkeleton />;
  } else {
    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card-p-4'>
              {Parse(legalDetails[0]["description"])}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LegalContents;
