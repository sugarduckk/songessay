import React from 'react';
import { useDispatch } from 'react-redux';
import { ClickableText } from 'shared-lib/text';
import { setDialogScreen } from '../../../redux/actions';
import { CustomDialog } from 'shared-lib/dialog';
import EmailForm from './EmailForm';

const ForgetPasswordButton = props => {
  const dispatch = useDispatch();
  const onForgetPasswordClick = React.useCallback(e => {
    dispatch(setDialogScreen(() => {
      return <CustomDialog>
        <EmailForm />
      </CustomDialog>;
    }));
  }, [dispatch]);
  return <ClickableText onClick={onForgetPasswordClick} type='button'>Reset password</ClickableText>;
};

export default ForgetPasswordButton;