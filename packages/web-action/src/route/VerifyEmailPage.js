import React from 'react';
import { applyActionCode } from 'firebase-wrapper/auth';
import { useHttpsCallable } from 'firebase-wrapper/function';

const VerifyEmailPage = ({ uid, actionCode, ...otherProps }) => {
  const [status, setStatus] = React.useState('');
  var updateEmailVerified = useHttpsCallable('updateEmailVerified');
  React.useEffect(() => {
    setStatus('Applying action code');
    applyActionCode(actionCode)
      .then(() => {
        setStatus('Email verified, notifying client');
        return updateEmailVerified({ uid });
      })
      .then(() => {
        setStatus('You may go back to the website');
      })
      .catch(error => {
        setStatus(error.code + ": " + error.message);
      });
  }, [actionCode, uid, updateEmailVerified]);
  return <div>
    {status}
  </div>;
};

export default VerifyEmailPage;