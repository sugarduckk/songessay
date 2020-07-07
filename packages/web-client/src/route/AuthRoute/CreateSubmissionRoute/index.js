import React, { Suspense } from 'react';
import EssayForm from './EssayForm';
import ProcessLayout from 'shared-lib/layout/ProcessLayout';
import PackageForm from './PackageForm';
import useShowDialogPromise from '../../../hook/useShowDialogPromise';
import UploadEssayDialog from './UploadEssayDialog';
import CenterLayout from 'shared-lib/layout/CenterLayout';

const CreateSubmissionRoute = props => {
  const renderPromise = React.useCallback((resolve, reject, values) => {
    return <Suspense fallback={<div>loading</div>}>
      <UploadEssayDialog values={values} resolve={resolve} reject={reject} />
    </Suspense>;
  }, []);
  const onSubmit = useShowDialogPromise(renderPromise);
  return <CenterLayout>
    <ProcessLayout.Main onSubmit={onSubmit}>
      <EssayForm />
      <PackageForm />
    </ProcessLayout.Main>
  </CenterLayout>;
};

export default CreateSubmissionRoute;