import React from 'react';
import { useDispatch } from 'react-redux';
import { setDialogScreen } from '../../../redux/actions';
import { MessageDialog } from 'shared-lib/dialog';
import useDismissDialog from '../../../hook/useDismissDialog';
import FetchSignInMethodDialog from './FetchSignInMethodDialog';

const useHandleLoginError = () => {
  const dispatch = useDispatch();
  const dismissDialog = useDismissDialog();
  return React.useCallback((values, error) => {
    if (error.code === 'auth/wrong-password') {
      dispatch(setDialogScreen(() => {
        return <FetchSignInMethodDialog email={values.email} />;
      }));
    }
    else {
      dispatch(setDialogScreen(() => {
        return <MessageDialog message={`(Error code: ${error.code}) ${error.message}`} onDismiss={dismissDialog} />;
      }));
    }
  }, [dispatch, dismissDialog]);
};

export default useHandleLoginError;