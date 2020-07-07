import React from 'react';
import { Form, Fieldset, Legend, FileUploader, RadioGroup, TextAreaInput } from 'shared-lib/form-item';
import { useForm } from 'shared-lib/hook';
import validateEssayForm from './validateEssayForm';
import FileExtension from 'shared-lib/form-item/FileUploader/FileExtension';
import UploadFileIcon from 'shared-lib/res/icons/UploadFileIcon';
import TextIcon from 'shared-lib/res/icons/TextIcon';
import { PrimaryButton } from 'shared-lib/button';
import { useDispatch } from 'react-redux';
import { setDialogScreen } from '../../../../redux/actions';
import useDismissDialog from '../../../../hook/useDismissDialog';
import DecisionDialog from 'shared-lib/dialog/DecisionDialog';

const defaultEssayFormValues = {
  essayQuestion: '',
  submitType: 'file',
  fileUploads: [],
  essayText: ''
};

const submitTypeOptions = [
  {
    label: 'uploading file(s)',
    value: 'file',
    Icon: UploadFileIcon
  },
  {
    label: 'copy and paste',
    value: 'text',
    Icon: TextIcon
  }
];

const EssayForm = ({ onSubmitSubForm, goNextPage, show }) => {
  const dispatch = useDispatch();
  const dismissDialog = useDismissDialog();
  const onSubmit = React.useCallback(values => {
    return onSubmitSubForm('essayValues', values);
  }, [onSubmitSubForm]);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultEssayFormValues, onSubmit, validateEssayForm, null, goNextPage);
  const fileExistCallback = React.useCallback(payload => {
    const onYes = () => {
      payload.confirmCallback();
      dismissDialog();
    };
    dispatch(setDialogScreen(() => {
      return <DecisionDialog message={payload.text} onNo={dismissDialog} onYes={onYes} />;
    }));
  }, [dispatch, dismissDialog]);
  return <Form onSubmit={handleSubmit} show={show}>
    <Fieldset disable={submitting}>
      <Legend>New Essay Submission</Legend>
      <TextAreaInput label='essay question' name='essayQuestion' value={values.essayQuestion} error={errors.essayQuestion} handleChange={handleChange} />
      <RadioGroup label='submit method' name='submitType' options={submitTypeOptions} value={values.submitType} handleChange={handleChange} error={errors.submitType} />
      {
        values.submitType === 'file' ?
          <FileUploader fileExistCallback={fileExistCallback} label='essay file(s) uploader' browseButtonLabel='Upload from device' acceptFiles={FileExtension} name='fileUploads' value={values.fileUploads} handleChange={handleChange} error={errors.fileUploads} />
          :
          <TextAreaInput label='copy and paste essay here' name='essayText' value={values.essayText} handleChange={handleChange} error={errors.essayText} />
      }
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>select package</PrimaryButton>
  </Form>;
};

export default EssayForm;