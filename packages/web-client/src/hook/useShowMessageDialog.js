import React from 'react';
import { useDispatch } from 'react-redux';
import { MessageDialog } from 'shared-lib/dialog';
import useDismissDialog from './useDismissDialog';
import { setDialogScreen, dismissDialogScreen } from '../redux/actions';

const useShowMessageDialog = (getMessage, dismiss = false) => {
  const dispatch = useDispatch();
  const dismissDialog = useDismissDialog();
  const defaultGetMessage = React.useCallback(message => message, []);
  return React.useCallback((...args) => {
    dispatch(setDialogScreen(() => {
      return <MessageDialog message={getMessage ? getMessage(...args) : defaultGetMessage(...args)} onDismiss={dismissDialog} />;
    }));
    if (dismiss) {
      dispatch(dismissDialogScreen());
    }
  }, [dispatch, dismissDialog, dismiss, getMessage, defaultGetMessage]);
};

export default useShowMessageDialog;