import React from 'react';
import { useHistory } from 'react-router-dom';

const useSetSubmissionScreen = (owner, subId) => {
  const history = useHistory();
  return React.useCallback((screenIndex) => {
    if (subId) {
      history.replace({
        pathname: '/submission',
        search: `?owner=${owner}&subId=${subId}&screen=${screenIndex}`
      });
    }
  }, [history, owner, subId]);
};

export default useSetSubmissionScreen;