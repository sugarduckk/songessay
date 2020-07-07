import React from 'react';
import useHttpsCallable from './useHttpsCallable';
import fetchSignInMethodsForEmail from '../auth/fetchSignInMethodsForEmail';

const useAddRoleEffect = (values, handleStatus) => {
  const [added, setAdded] = React.useState(false);
  const createUser = useHttpsCallable('createUser');
  const setCustomClaims = useHttpsCallable('setCustomClaims');
  React.useEffect(() => {
    if (!added) {
      setAdded(true);
      const { email, password, role } = values;
      handleStatus('CHECKING_USER');
      fetchSignInMethodsForEmail(email)
        .then(methods => {
          if (methods.length == 0) {
            handleStatus('CREATING_USER');
            return createUser({
              email,
              password,
              emailVerified: true,
              claims: {
                role
              }
            });
          }
          else {
            handleStatus('ADDING_ROLE');
            return setCustomClaims({
              email,
              claims: {
                role
              }
            });
          }
        })
        .then(() => {
          handleStatus('DONE');
        });
    }
  }, [added, createUser, handleStatus, setCustomClaims, values]);
};

export default useAddRoleEffect;