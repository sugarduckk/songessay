import React from 'react';
import useGlobalState from './useGlobalState';
import { useDispatch } from 'react-redux';
import { setState } from '../redux/actions';

const useEmailVerifiedEffect = () => {
  const dispatch = useDispatch();
  const { user, userDoc } = useGlobalState();
  const { emailVerified } = userDoc || {};
  React.useEffect(() => {
    if (emailVerified) {
      user.reload()
        .then(() => {
          dispatch(setState({
            user
          }));
        });
    }
  }, [user, emailVerified, dispatch]);
};

export default useEmailVerifiedEffect;