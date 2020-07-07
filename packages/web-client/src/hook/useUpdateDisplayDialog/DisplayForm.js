import React, { Suspense } from 'react';
import { Form, Fieldset, Legend, ImageCropper } from 'shared-lib/form-item';
import { PrimaryButton } from 'shared-lib/button';
import useGlobalState from '../useGlobalState';
import { useForm } from 'shared-lib/hook';
import useDismissDialog from '../useDismissDialog';
import useShowDialogPromise from '../useShowDialogPromise';
import DisplayUploadDialog from './DisplayUploadDialog';

const defaultValues = {
  profile: null
};

const FieldForm = () => {
  const { user } = useGlobalState();
  const renderPromise = React.useCallback((resolve, reject, values) => {
    return <Suspense fallback={<div>loading</div>}>
      <DisplayUploadDialog values={values} resolve={resolve} reject={reject} />
    </Suspense>;
  }, []);
  const dismissDialog = useDismissDialog();
  const uploadDisplay = useShowDialogPromise(renderPromise);
  const onSubmit = React.useCallback(values => {
    dismissDialog();
    return uploadDisplay(values);
  }, [dismissDialog, uploadDisplay]);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultValues, onSubmit, null, null, null);
  return <Form onSubmit={handleSubmit}>
    <Fieldset disabled={submitting}>
      <Legend>{`Change profile image`}</Legend>
      <ImageCropper label='select profile image' name='profile' value={values.profile} handleChange={handleChange} error={errors.profile} />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>submit</PrimaryButton>
    <PrimaryButton disabled={submitting} onClick={dismissDialog} type='button'>cancel</PrimaryButton>
  </Form>;
};

export default FieldForm;