import React from 'react';
import { PromiseDialog } from 'shared-lib/dialog';
import useDismissDialog from '../../../hook/useDismissDialog';
import useGlobalState from '../../../hook/useGlobalState';
import { useSetEmailVerificationTimestamp } from 'firebase-wrapper/firestore';

const SendEmailVerificationDialog = props => {
  const { user } = useGlobalState();
  const [message, setMessage] = React.useState(`Sending email verification to ${user.email}`);
  const dismissDialog = useDismissDialog();
  const setEmailVerificationTimestamp = useSetEmailVerificationTimestamp(user.uid);
  const getPromise = React.useCallback(() => {
    var actionCodeSettings = {
      url: `${process.env.ACTION_HANDLER_DOMAIN}?uid=${user.uid}`
    };
    console.log('sending email verification');
    return user.sendEmailVerification(actionCodeSettings).then(setEmailVerificationTimestamp);
  }, [user, setEmailVerificationTimestamp]);
  const onSuccess = React.useCallback(() => {
    setMessage(`Verification email is successfully sent.`);
  }, []);
  const onError = React.useCallback(error => {
    setMessage(`(Error code: ${error.code}) ${error.message}`);
  }, []);
  return <PromiseDialog message={message} onDismiss={dismissDialog} getPromise={getPromise} onSuccess={onSuccess} onError={onError} />;
};

export default SendEmailVerificationDialog;