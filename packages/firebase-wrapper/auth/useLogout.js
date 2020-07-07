import React from 'react';
import { auth } from '..';

const useLogout = () => {
  return React.useCallback(() => {
    return auth.signOut();
  }, []);
};

export default useLogout;