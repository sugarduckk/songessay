import React from 'react';
import { auth } from '..';

const useResetPassword = () => {
  return React.useCallback((values) => {
    console.log('sendPasswordResetEmail');
    return auth.sendPasswordResetEmail(values.email);
  }, []);
};

export default useResetPassword;