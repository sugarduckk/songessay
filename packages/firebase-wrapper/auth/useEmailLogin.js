import React from 'react';
import { auth } from '..';

const useEmailLogin = () => {
  return React.useCallback((values) => {
    return auth.signInWithEmailAndPassword(values.email, values.password);
  }, []);
};

export default useEmailLogin;