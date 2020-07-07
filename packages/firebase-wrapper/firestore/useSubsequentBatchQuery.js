import React from 'react';
import { fs } from '..';

const useSubsequentBatchQuery = (query, limit, lastRef, handleSubsequentBatch) => {
  return React.useEffect(() => {
    console.log('fetch subsequent batch', lastRef.id);
    return query.startAfter(lastRef).limit(limit)
      .onSnapshot(snapshot => {
        var temp = [];
        snapshot.forEach(doc => {
          temp.push({
            ref: doc,
            id: doc.id,
            data: doc.data()
          });
        });
        handleSubsequentBatch(temp);
      });
  }, [query, limit, handleSubsequentBatch, lastRef]);
};

export default useSubsequentBatchQuery;