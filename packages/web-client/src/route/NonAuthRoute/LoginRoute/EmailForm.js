import React from 'react';
import { useResetPassword } from 'firebase-wrapper/auth';
import { emailValidator } from 'shared-lib/validator';
import { useForm } from 'shared-lib/hook';
import { Form, Fieldset, TextInput, Legend } from 'shared-lib/form-item';
import { PrimaryButton } from 'shared-lib/button';
import useDismissDialog from '../../../hook/useDismissDialog';
import useHandleDialogError from '../../../hook/useHandleDialogError';
import useShowMessageDialog from '../../../hook/useShowMessageDialog';

const defaultEmailValue = {
  email: ''
};

const EmailForm = props => {
  const dismissDialog = useDismissDialog();
  const resetPassword = useResetPassword();
  const handleResetPassword = useHandleDialogError();
  const getMessage = React.useCallback(values => {
    return `A password reset email has been set to ${values.email}.`;
  }, []);
  const showMessage = useShowMessageDialog(getMessage, true);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultEmailValue, resetPassword, emailValidator, handleResetPassword, showMessage);
  return <Form onSubmit={handleSubmit}>
    <Fieldset disabled={submitting}>
      <Legend>Reset password</Legend>
      <TextInput label='email to reset password' name='email' value={values.email} handleChange={handleChange} error={errors.email} />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>submit</PrimaryButton>
    <PrimaryButton disabled={submitting} onClick={dismissDialog} type='button'>cancel</PrimaryButton>
  </Form>;
};

export default EmailForm;