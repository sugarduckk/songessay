import React from 'react';
import { auth, FacebookAuthProvider } from '..';

const useFacebookLogin = () => {
  var provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  const onFacebookLoginClick = React.useCallback(e => {
    auth.signInWithRedirect(provider)
      .then(() => {
        console.log('redirect successfully');
      })
      .catch(error => {
        console.log(error.code + " " + error.message);
      });
  }, [provider]);
  return onFacebookLoginClick;
};

export default useFacebookLogin;