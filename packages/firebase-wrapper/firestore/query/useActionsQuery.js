import React from 'react';
import { fs } from '../..';

const useActionsQuery = (uid, submissionId) => {
  return React.useMemo(() => {
    return (uid && submissionId) ? fs.collection(`users/${uid}/submissions/${submissionId}/actions`).orderBy('timestamp', 'desc') : null;
  }, [uid, submissionId]);
};

export default useActionsQuery;