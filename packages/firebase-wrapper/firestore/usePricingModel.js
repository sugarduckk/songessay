import React from 'react';
import { fs } from '..';

const usePricingModel = (handlePricing) => {
  React.useEffect(() => {
    return fs.collection('pricing')
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          const pricingModel = {};
          snapshot.forEach(doc => {
            pricingModel[doc.id] = doc.data();
          });
          handlePricing(pricingModel);
        }
        else {
          handlePricing();
        }
      });
  }, [handlePricing]);
};

export default usePricingModel;