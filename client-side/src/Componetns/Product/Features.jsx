import React from "react";
import featureStore from "../../Store/FeatureStore";
import FeaturesSkeleton from "../../LoadingSkeleton/FeaturesSkeleton";

const Features = () => {
  const { featureList } = featureStore();

  if (featureList === null) {
    return <FeaturesSkeleton />;
  } else {
    return (
      <div className='container section'>
        <div className='row'>
          {featureList.map((item, i) => {
            return (
              <div key={i} className='col-6 p-2 col-md-3 col-lg-3 col-sm-6'>
                <div className='card shadow-sm'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-3'>
                        <img src={item.img} className='w-100' alt='img' />
                      </div>
                      <div className='col-9'>
                        <h3 className='bodyLarge'>{item.name}</h3>
                        <span className='bodySmal'>{item.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Features;
