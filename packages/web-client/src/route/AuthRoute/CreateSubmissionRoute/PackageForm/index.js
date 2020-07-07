import React from 'react';
import { Form, Fieldset, Legend, TextInput, FileUploader, RadioGroup, TextAreaInput } from 'shared-lib/form-item';
import { useForm } from 'shared-lib/hook';
import FileExtension from 'shared-lib/form-item/FileUploader/FileExtension';
import UploadFileIcon from 'shared-lib/res/icons/UploadFileIcon';
import TextIcon from 'shared-lib/res/icons/TextIcon';
import { PrimaryButton } from 'shared-lib/button';
import validatePackageForm from './validatePackageForm';
import SelectInput from 'shared-lib/form-item/SelectInput';
import { useHistory } from 'react-router-dom';
import WordCount from 'shared-lib/res/constant/WordCount';
import useDefaultPackageValues from './useDefaultPackageValues';

const wordCountOptions = WordCount.map(n => ({
  label: n.toString(),
  value: n
}));

const packageOptions = [
  {
    label: 'Basic',
    value: 'basic',
    Icon: UploadFileIcon
  },
  {
    label: 'Intermediate',
    value: 'intermediate',
    Icon: TextIcon
  },
  {
    label: 'Advance',
    value: 'advance',
    Icon: TextIcon
  }
];

const formatOptions = [
  {
    label: 'PDF',
    value: 'pdf',
    Icon: UploadFileIcon
  },
  {
    label: 'Video',
    value: 'video',
    Icon: TextIcon
  },
  {
    label: 'Live',
    value: 'live',
    Icon: TextIcon
  }
];

const waitTimeOptions = [
  {
    label: '3',
    value: 3
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '7',
    value: 7
  }
];

const PackageForm = ({ onSubmitForm, goPrevPage, show, globalValues }) => {
  const onSubmit = React.useCallback(values => {
    return onSubmitForm('packageValues', values);
  }, [onSubmitForm]);
  const history = useHistory();
  const goToDashboard = React.useCallback(() => {
    history.push('/');
  }, [history]);
  const defaultPackageFormValues = useDefaultPackageValues(globalValues.essayValues);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultPackageFormValues, onSubmit, validatePackageForm, null, goToDashboard);

  return <Form onSubmit={handleSubmit} show={show}>
    <Fieldset disabled={submitting}>
      <Legend>New Essay Submission</Legend>
      <SelectInput disabled={globalValues.essayValues && globalValues.essayValues.submitType === 'text'} type='number' options={wordCountOptions} label='word count' name='wordCount' value={values.wordCount} handleChange={handleChange} error={errors.wordCount} />
      <RadioGroup label='package' name='package' options={packageOptions} value={values.package} handleChange={handleChange} error={errors.package} />
      <RadioGroup label='format' name='format' options={formatOptions} value={values.format} handleChange={handleChange} error={errors.format} />
      <SelectInput type='number' options={waitTimeOptions} label='wait time (days)' name='waitTime' value={values.waitTime} handleChange={handleChange} error={errors.waitTime} />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='button' onClick={goPrevPage}>back</PrimaryButton>
    <PrimaryButton disabled={submitting} type='submit'>submit</PrimaryButton>
  </Form>;
};

export default PackageForm;