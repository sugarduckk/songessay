import React from 'react';
import { useHistory } from 'react-router-dom';

const useSetRolesScreen = () => {
  const history = useHistory();
  return React.useCallback((screenIndex) => {
    history.replace({
      pathname: '/roles',
      search: `?screen=${screenIndex}`
    });
  }, [history]);
};

export default useSetRolesScreen;