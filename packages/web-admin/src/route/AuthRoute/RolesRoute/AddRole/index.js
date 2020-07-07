import React, { Suspense } from 'react';
import { CenterLayout } from 'shared-lib/layout';
import { Form, Fieldset, Legend, TextInput } from 'shared-lib/form-item';
import SelectInput from 'shared-lib/form-item/SelectInput';
import PrimaryButton from 'shared-lib/button/PrimaryButton';
import { useForm } from 'shared-lib/hook';
import useHttpsCallable from 'firebase-wrapper/function/useHttpsCallable';
import useSetRolesScreen from '../useSetRolesScreen';
import fetchSignInMethodsForEmail from 'firebase-wrapper/auth/fetchSignInMethodsForEmail';
import useShowMessageDialog from '../../../../hook/useShowMessageDialog';
import roleOptions from './roleOptions';
import useShowDialogPromise from '../../../../hook/useShowDialogPromise';
import SetRoleDialog from './SetRoleDialog';

const defaultValues = {
  email: '',
  password: '',
  role: roleOptions[0].value
};

const AddRole = props => {
  const setRolesScreen = useSetRolesScreen();
  // const createUser = useHttpsCallable('createUser');
  // const setCustomClaims = useHttpsCallable('setCustomClaims');
  const showMessageDialog = useShowMessageDialog();
  const renderPromise = React.useCallback((resolve, reject, values) => {
    return <Suspense fallback={<div>loading</div>}>
      <SetRoleDialog values={values} resolve={resolve} reject={reject} />
    </Suspense>;
  }, []);
  const onSubmit = useShowDialogPromise(renderPromise);
  // const onSubmit = React.useCallback(values => {
  //   const { email, password, role } = values;
  //   return fetchSignInMethodsForEmail(email)
  //     .then(methods => {
  //       if (methods.length == 0) {
  //         return createUser({
  //           email,
  //           password,
  //           emailVerified: true,
  //           claims: {
  //             role
  //           }
  //         });
  //       }
  //       else {
  //         return setCustomClaims({
  //           email,
  //           claims: {
  //             role
  //           }
  //         });
  //       }
  //     });

  // }, [createUser, setCustomClaims]);
  const onSubmitted = React.useCallback(() => {
    setRolesScreen(0);
  }, [setRolesScreen]);
  const handleError = React.useCallback((values, error) => {
    const { code, message } = error;
    showMessageDialog(`Error code: ${code} - ${message}`);
  }, [showMessageDialog]);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultValues, onSubmit, null, handleError, onSubmitted, true);
  return <Form onSubmit={handleSubmit}>
    <Fieldset disabled={submitting}>
      <Legend>Add roles</Legend>
      <TextInput label='email' name='email' value={values.email} error={errors.email} handleChange={handleChange} autoComplete="username" />
      <TextInput label='password' name='password' value={values.password} error={errors.password} handleChange={handleChange} type='password' autoComplete="current-password" />
      <SelectInput label='role' name='role' options={roleOptions} value={values.role} handleChange={handleChange} />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>add</PrimaryButton>
  </Form>;
};

export default AddRole;