import React from 'react';
import { FullLayout, CenterLayout } from 'shared-lib/layout';
import { Form, Fieldset, Legend, TextInput } from 'shared-lib/form-item';
import { PrimaryButton } from 'shared-lib/button';
import { useForm } from 'shared-lib/hook';
import { loginValidator } from 'shared-lib/validator';
import { useEmailLogin } from 'firebase-wrapper/auth';

const defaultLoginValue = {
  email: '',
  password: ''
};

const NonAuthRoute = props => {
  const emailLogin = useEmailLogin();
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultLoginValue, emailLogin, loginValidator, null, null);
  return <FullLayout>
    <CenterLayout>
      <Form onSubmit={handleSubmit}>
        <Fieldset disabled={submitting}>
          <Legend>login</Legend>
          <TextInput label='email' name='email' value={values.email} error={errors.email} handleChange={handleChange} autoComplete="username" />
          <TextInput label='password' name='password' value={values.password} error={errors.password} handleChange={handleChange} type='password' autoComplete="current-password" />
        </Fieldset>
        <PrimaryButton disabled={submitting} type='submit'>login</PrimaryButton>
      </Form>
    </CenterLayout>
  </FullLayout>;
};

export default NonAuthRoute;