import React from 'react';
import { auth } from '..';

const useAuthState = handleUser => {
  React.useEffect(() => {
    return auth.onAuthStateChanged(handleUser);
  }, [handleUser]);
};

export default useAuthState;