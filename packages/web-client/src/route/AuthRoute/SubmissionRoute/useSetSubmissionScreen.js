import React from 'react';
import { useHistory } from 'react-router-dom';

const useSetSubmissionScreen = (subId) => {
  const history = useHistory();
  return React.useCallback((screenIndex) => {
    if (subId) {
      history.replace({
        pathname: '/submission',
        search: `?subId=${subId}&screen=${screenIndex}`
      });
    }
  }, [history, subId]);
};

export default useSetSubmissionScreen;