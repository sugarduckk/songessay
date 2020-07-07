import React from 'react';
import { fs } from '..';

const useFirstBatchQuery = (query, limit, handleFirstBatch) => {
  return React.useEffect(() => {
    console.log('fetch first batch');
    return query.limit(limit)
      .onSnapshot(snapshot => {
        var temp = [];
        snapshot.forEach(doc => {
          temp.push({
            ref: doc,
            id: doc.id,
            data: doc.data()
          });
        });
        handleFirstBatch(temp);
      });
  }, [query, limit, handleFirstBatch]);
};

export default useFirstBatchQuery;