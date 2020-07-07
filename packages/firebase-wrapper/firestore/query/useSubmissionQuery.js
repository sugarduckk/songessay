import React from 'react';
import { fs } from '../..';

const useSubmissionQuery = (uid) => {
  return React.useMemo(() => {
    return fs.collection('users').doc(uid).collection('submissions').orderBy('timestamp', 'desc');
  }, [uid]);
};

export default useSubmissionQuery;