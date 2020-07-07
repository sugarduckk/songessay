import React from 'react';
import { fs } from '..';

const useAggregatedSubmissions = (handleAggregation) => {
  React.useEffect(() => {
    return fs.collection('aggregation').doc('submissions')
      .onSnapshot(doc => {
        if (doc.exists) {
          handleAggregation(doc.data());
        }
      });
  }, [handleAggregation]);
};

export default useAggregatedSubmissions;