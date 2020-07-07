import React from 'react';
import { useDispatch } from "react-redux";
import { removeDialogScreen } from '../redux/actions';

const useRemoveDialog = () => {
  const dispatch = useDispatch();
  return React.useCallback(e => {
    dispatch(removeDialogScreen());
  }, [dispatch]);
};

export default useRemoveDialog;