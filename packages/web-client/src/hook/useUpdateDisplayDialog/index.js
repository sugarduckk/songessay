import React from 'react';
import { useDispatch } from 'react-redux';
import { setDialogScreen } from '../../redux/actions';
import { CustomDialog } from 'shared-lib/dialog';
import DisplayForm from './DisplayForm';

const useUpdateDisplayDialog = () => {
  const dispatch = useDispatch();
  const updateDisplay = React.useCallback(e => {
    dispatch(setDialogScreen(() => {
      return <CustomDialog>
        <DisplayForm />
      </CustomDialog>;
    }));
  }, [dispatch]);
  return updateDisplay;
};

export default useUpdateDisplayDialog;