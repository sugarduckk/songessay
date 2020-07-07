import React from 'react';
import { Form, Fieldset, Legend, TextInput, TextDivider } from 'shared-lib/form-item';
import { useForm } from 'shared-lib/hook';
import { useEmailLogin, useFacebookLogin, useGoogleLogin } from 'firebase-wrapper/auth';
import { loginValidator } from 'shared-lib/validator';
import { PrimaryButton, FacebookLoginButton, GoogleLoginButton } from 'shared-lib/button';
import useHandleLoginError from './useHandleLoginError';
import ForgetPasswordButton from './ForgetPasswordButton';

const defaultLoginValue = {
  email: '',
  password: ''
};

const LoginRoute = props => {
  const emailLogin = useEmailLogin();
  const facebookLogin = useFacebookLogin();
  const googleLogin = useGoogleLogin();
  const handleLoginError = useHandleLoginError();
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultLoginValue, emailLogin, loginValidator, handleLoginError, null);
  return <Form onSubmit={handleSubmit}>
    <Fieldset disabled={submitting}>
      <Legend>login</Legend>
      <TextInput label='email' name='email' value={values.email} error={errors.email} handleChange={handleChange} autoComplete="username" />
      <TextInput label='password' name='password' value={values.password} error={errors.password} handleChange={handleChange} type='password' autoComplete="current-password" />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>login</PrimaryButton>
    <TextDivider text='or' />
    <FacebookLoginButton disabled={submitting} onClick={facebookLogin} type='button'>continue with Facebook</FacebookLoginButton>
    <GoogleLoginButton disabled={submitting} onClick={googleLogin} type='button'>signin with Google</GoogleLoginButton>
    <ForgetPasswordButton />
  </Form>;
};

export default LoginRoute;