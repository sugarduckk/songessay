import React from 'react';
import { auth, GoogleAuthProvider } from '..';

const useGoogleLogin = () => {
  var provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  const onGoogleLoginClick = React.useCallback(e => {
    auth.signInWithRedirect(provider);
  }, [provider]);
  return onGoogleLoginClick;
};

export default useGoogleLogin;