import React from 'react';
import { auth } from '..';

const useRegister = () => {
  return React.useCallback((values) => {
    return auth.createUserWithEmailAndPassword(values.email, values.password);
  }, []);
};

export default useRegister;