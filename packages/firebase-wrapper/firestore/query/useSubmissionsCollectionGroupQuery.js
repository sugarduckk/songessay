import React from 'react';
import { fs } from '../..';

const useSubmissionsCollectionGroupQuery = (status) => {
  return React.useMemo(() => {
    if (status === 'total') {
      return fs.collectionGroup('submissions').orderBy('timestamp', 'desc');
    }
    else {
      return fs.collectionGroup('submissions').where('status', '==', status).orderBy('timestamp', 'desc');
    }
  }, [status]);
};

export default useSubmissionsCollectionGroupQuery;