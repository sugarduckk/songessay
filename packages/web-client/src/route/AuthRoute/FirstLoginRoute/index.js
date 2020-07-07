import React, { Suspense } from 'react';
import { FullLayout, CenterLayout, NavBarContentLayour } from 'shared-lib/layout';
import { NavBar, NavSpace } from 'shared-lib/nav';
import { BlankButton, PrimaryButton } from 'shared-lib/button';
import { useLogout } from 'firebase-wrapper/auth';
import { Form, Fieldset, Legend, TextInput, ImageCropper } from 'shared-lib/form-item';
import { useForm } from 'shared-lib/hook';
import defaultProfileFormValues from './defaultProfileFormValues';
import validateProfileForm from './validateProfileForm';
import useShowDialogPromise from '../../../hook/useShowDialogPromise';

const FirstLoginDialog = React.lazy(() => import('./FirstLoginDialog'));

const FirstLoginRoute = props => {
  const logout = useLogout();
  const renderPromise = React.useCallback((resolve, reject, values) => {
    return <Suspense fallback={<div>loading</div>}>
      <FirstLoginDialog values={values} resolve={resolve} reject={reject} />
    </Suspense>;
  }, []);
  const onSubmit = useShowDialogPromise(renderPromise);
  const {
    handleSubmit,
    submitting,
    values,
    errors,
    handleChange
  } = useForm(defaultProfileFormValues, onSubmit, validateProfileForm, null, null);
  return <FullLayout>
    <NavBar>
      <NavSpace>

      </NavSpace>
      <BlankButton onClick={logout}>logout</BlankButton>
    </NavBar>
    <NavBarContentLayour>
      <CenterLayout>
        <Form onSubmit={handleSubmit}>
          <Fieldset disabled={submitting}>
            <Legend>Set profile</Legend>
            <TextInput label='firstname' name='firstname' value={values.firstname} handleChange={handleChange} error={errors.firstname} />
            <TextInput label='lastname' name='lastname' value={values.lastname} handleChange={handleChange} error={errors.lastname} />
            <TextInput label='nickname' name='nickname' value={values.nickname} handleChange={handleChange} error={errors.nickname} />
            <ImageCropper label='select profile image' name='profile' value={values.profile} handleChange={handleChange} error={errors.profile} />
          </Fieldset>
          <PrimaryButton disabled={submitting}>submit</PrimaryButton>
        </Form>
      </CenterLayout>
    </NavBarContentLayour>
  </FullLayout>;
};

export default FirstLoginRoute;