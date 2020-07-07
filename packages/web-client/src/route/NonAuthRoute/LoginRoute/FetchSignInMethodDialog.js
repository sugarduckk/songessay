import React from 'react';
import { PromiseDialog } from 'shared-lib/dialog';
import useDismissDialog from '../../../hook/useDismissDialog';
import { fetchSignInMethodsForEmail } from 'firebase-wrapper/auth';

const FetchSignInMethodDialog = ({ email }) => {
  const [message, setMessage] = React.useState('Error happened.');
  const dismissDialog = useDismissDialog();
  const getPromise = React.useCallback(() => {
    return fetchSignInMethodsForEmail(email);
  }, [email]);
  const onSuccess = React.useCallback(methods => {
    if (methods.includes('password')) {
      setMessage(`You have entered a wrong password.`);
    }
    else {
      const recommendedMethod = methods[0];
      setMessage(`Signin method for this email is ${recommendedMethod}`);
    }
  }, []);
  const onError = React.useCallback(error => {
    if (error.code === 'auth/invalid-email') {
      setMessage(`(Error code: ${error.code}) ${error.message}`);
    }
  }, []);
  return <PromiseDialog message={message} onDismiss={dismissDialog} getPromise={getPromise} onSuccess={onSuccess} onError={onError} />;
};

export default FetchSignInMethodDialog;