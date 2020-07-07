import React from 'react';
import VerifyEmailPage from './route/VerifyEmailPage';
import ResetPasswordPage from './route/ResetPasswordPage';

const App = props => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const actionCode = params.get('oobCode');
  const continueUrl = params.get('continueUrl');
  var continueUrlObj, continueUrlParams, uid;
  if (continueUrl) {
    continueUrlObj = new URL(continueUrl);
    continueUrlParams = new URLSearchParams(continueUrlObj.search);
    uid = continueUrlParams.get('uid');
  }
  switch (mode) {
    case 'resetPassword':
      return <ResetPasswordPage actionCode={actionCode} />;
    case 'recoverEmail':
      return <div>Email recover page</div>;
    case 'verifyEmail':
      return <VerifyEmailPage uid={uid} actionCode={actionCode} />;
    default:
      return <div>Error Page: no mode search params</div>;
  }
};

export default App;
