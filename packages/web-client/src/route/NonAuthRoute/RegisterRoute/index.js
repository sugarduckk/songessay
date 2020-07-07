import React from 'react';
import { Form, Fieldset, Legend, TextInput } from 'shared-lib/form-item';
import { useForm } from 'shared-lib/hook';
import { useRegister } from 'firebase-wrapper/auth';
import { PrimaryButton } from 'shared-lib/button';
import { registerValidator } from 'shared-lib/validator';

const defaultRegisterValue = {
  email: '',
  password: '',
  confirmPassword: ''
};

const RegisterRoute = props => {
  const register = useRegister();
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultRegisterValue, register, registerValidator, null, null);
  return <Form onSubmit={handleSubmit}>
    <Fieldset disabled={submitting}>
      <Legend>register</Legend>
      <TextInput label='email' name='email' value={values.email} error={errors.email} handleChange={handleChange} />
      <TextInput label='password' name='password' value={values.password} error={errors.password} handleChange={handleChange} type='password' />
      <TextInput label='confirm password' name='confirmPassword' value={values.confirmPassword} error={errors.confirmPassword} handleChange={handleChange} type='password' />
    </Fieldset>
    <PrimaryButton disabled={submitting} type='submit'>register</PrimaryButton>
  </Form>;
};

export default RegisterRoute;