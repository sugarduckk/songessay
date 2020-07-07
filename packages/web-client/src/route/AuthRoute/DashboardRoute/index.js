import React from 'react';
import useGlobalState from '../../../hook/useGlobalState';
import { useDispatch } from 'react-redux';
import { setState } from '../../../redux/actions';
import SubmissionDiv from './SubmissionDiv';
import LoadMoreContainer from 'shared-lib/component/SubmissionPreview/LoadMoreContainer';
import CenterLayout from 'shared-lib/layout/CenterLayout';

const DashboardRoute = props => {
  const dispatch = useDispatch();
  const { userDoc, submissionsBatches } = useGlobalState();
  const totalSubmissionsLoaded = React.useMemo(() => {
    return submissionsBatches.map(batch => batch.length).reduce((prev, curr) => prev + curr, 0);
  }, [submissionsBatches]);
  const loadMore = React.useCallback(e => {
    dispatch(setState(preState => {
      return {
        submissions: [...preState.submissions, preState.submissions.length],
        submissionsBatches: [...preState.submissionsBatches, []]
      };
    }));
  }, [dispatch]);
  return <CenterLayout>
    {submissionsBatches && submissionsBatches.length > 0 &&
      submissionsBatches.map((batch, batchIndex) => {
        return batch.map((doc, docIndex) => {
          return <SubmissionDiv key={doc.id} subId={doc.id} submission={doc.ref} />;
        });
      })}
    {userDoc.submissions && totalSubmissionsLoaded < userDoc.submissions.total && <LoadMoreContainer onClick={loadMore}>load more</LoadMoreContainer>}
  </CenterLayout>;
};

export default DashboardRoute;