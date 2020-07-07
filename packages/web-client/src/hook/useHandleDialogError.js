import React from 'react';
import { useDispatch } from 'react-redux';
import { MessageDialog } from 'shared-lib/dialog';
import useDismissDialog from './useDismissDialog';
import { setDialogScreen, dismissDialogScreen } from '../redux/actions';

const useHandleDialogError = (dismiss = true) => {
  const dispatch = useDispatch();
  const dismissDialog = useDismissDialog();
  return React.useCallback((values, error) => {
    dispatch(setDialogScreen(() => {
      return <MessageDialog message={`(Error code: ${error.code}) ${error.message}`} onDismiss={dismissDialog} />;
    }));
    if (dismiss) {
      dispatch(dismissDialogScreen());
    }
  }, [dispatch, dismissDialog, dismiss]);
};

export default useHandleDialogError;