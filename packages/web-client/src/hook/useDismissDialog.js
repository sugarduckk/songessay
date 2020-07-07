import React from 'react';
import { useDispatch } from "react-redux";
import { dismissDialogScreen } from '../redux/actions';

const useDismissDialog = () => {
  const dispatch = useDispatch();
  return React.useCallback(e => {
    dispatch(dismissDialogScreen());
  }, [dispatch]);
};

export default useDismissDialog;