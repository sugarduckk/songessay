import React from 'react';
import { fs } from '../..';

const usePaymentsQuery = (uid, submissionId) => {
  return React.useMemo(() => {
    return (uid && submissionId) ? fs.collection('users').doc(uid).collection('submissions').doc(submissionId).collection('payments').orderBy('timestamp', 'desc') : null;
  }, [uid, submissionId]);
};

export default usePaymentsQuery;