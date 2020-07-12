import React from 'react';
import { fs } from '..';

const useSetPricing = () => {
  return React.useCallback(pricingModel => {
    const batch = fs.batch();
    batch.set(fs.collection('pricing').doc('basic'), pricingModel.basic);
    batch.set(fs.collection('pricing').doc('intermediate'), pricingModel.intermediate);
    batch.set(fs.collection('pricing').doc('advanced'), pricingModel.advanced);
    return batch.commit();
  }, []);
};

export default useSetPricing;