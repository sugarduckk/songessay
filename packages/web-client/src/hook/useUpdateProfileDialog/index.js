import React from 'react';
import { useDispatch } from 'react-redux';
import { setDialogScreen } from '../../redux/actions';
import { CustomDialog } from 'shared-lib/dialog';
import FieldForm from './FieldForm';

const useUpdateProfileDialog = (field, defaultField) => {
  const dispatch = useDispatch();
  const updateProfile = React.useCallback(e => {
    dispatch(setDialogScreen(() => {
      return <CustomDialog>
        <FieldForm field={field} defaultField={defaultField} />
      </CustomDialog>;
    }));
  }, [dispatch, field, defaultField]);
  return updateProfile;
};

export default useUpdateProfileDialog;