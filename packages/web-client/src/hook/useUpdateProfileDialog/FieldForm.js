import React from 'react';
import { Form, Fieldset, TextInput, Legend } from 'shared-lib/form-item';
import { PrimaryButton } from 'shared-lib/button';
import useShowMessageDialog from '../useShowMessageDialog';
import useUpdateProfile from 'firebase-wrapper/firestore/useUpdateProfile';
import useGlobalState from '../useGlobalState';
import { useForm } from 'shared-lib/hook';
import useDismissDialog from '../useDismissDialog';

const FieldForm = ({ field, defaultField }) => {
  const { user } = useGlobalState();
  const defaultValues = React.useMemo(() => {
    return {
      [field]: defaultField
    };
  }, [field, defaultField]);
  const updateProfile = useUpdateProfile(user.uid, field);
  const getMessage = React.useCallback(values => {
    return `Your ${field} in updated to ${values[field]}.`;
  }, [field]);
  const showMessage = useShowMessageDialog(getMessage, true);
  const dismissDialog = useDismissDialog();
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultValues, updateProfile, null, null, showMessage);
  return <Form onSubmit={handleSubmit}>
    <Fieldset disabled={submitting}>
      <Legend>{`Edit ${field}`}</Legend>
      <TextInput label={field} name={field} value={values[field]} handleChange={handleChange} error={errors[field]} />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>submit</PrimaryButton>
    <PrimaryButton disabled={submitting} onClick={dismissDialog} type='button'>cancel</PrimaryButton>
  </Form>;
};

export default FieldForm;