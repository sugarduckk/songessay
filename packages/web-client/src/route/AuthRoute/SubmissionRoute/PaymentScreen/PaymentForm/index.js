import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import defaultPaymentFormValues from './defaultPaymentFormValues';
import validatePaymentForm from './validatePaymentForm';
import PaymentFileExt from './PaymentFileExt';
import { useForm } from 'shared-lib/hook';
import useDismissDialog from '../../../../../hook/useDismissDialog';
import { Form, Fieldset, Legend, FileUploader } from 'shared-lib/form-item';
import useShowDialogPromise from '../../../../../hook/useShowDialogPromise';
import UploadPaymentDialog from './UploadPaymentDialog';
import { setDialogScreen } from '../../../../../redux/actions';
import DecisionDialog from 'shared-lib/dialog/DecisionDialog';
import { PrimaryButton } from 'shared-lib/button';

const PaymentForm = ({ submissionId }) => {
  const dispatch = useDispatch();
  const dismissDialog = useDismissDialog();
  const renderPromise = React.useCallback((resolve, reject, values) => {
    return <Suspense fallback={<div>loading</div>}>
      <UploadPaymentDialog values={values} submissionId={submissionId} resolve={resolve} reject={reject} />
    </Suspense>;
  }, [submissionId]);
  const onSubmit = useShowDialogPromise(renderPromise);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultPaymentFormValues, onSubmit, validatePaymentForm);
  const fileExistCallback = React.useCallback(payload => {
    const onYes = () => {
      payload.confirmCallback();
      dismissDialog();
    };
    dispatch(setDialogScreen(() => {
      return <DecisionDialog message={payload.text} onNo={dismissDialog} onYes={onYes} />;
    }));
  }, [dispatch, dismissDialog]);
  return <Form onSubmit={handleSubmit} >
    <Fieldset disabled={submitting}>
      <Legend>Upload Payment Slip</Legend>
      <FileUploader fileExistCallback={fileExistCallback} label='payment file(s) uploader' browseButtonLabel='Upload from device' acceptFiles={PaymentFileExt} name='fileUploads' value={values.fileUploads} handleChange={handleChange} error={errors.fileUploads} />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>Upload slip</PrimaryButton>
  </Form>;
};

export default PaymentForm;