import React from 'react';
import { useHistory } from 'react-router-dom';
import SubmissionPreview from 'shared-lib/component/SubmissionPreview';

const SubmissionDiv = ({ submission, subId }) => {
  //const submissionId = React.useMemo(() => submission.id, [submission]);
  const { essayQuestion, status, timestamp, action } = React.useMemo(() => submission.data(), [submission]);
  const history = useHistory();
  const onClick = React.useCallback(e => {
    history.push({
      pathname: '/submission',
      search: `?subId=${subId}&screen=0`
    });
  }, [history, subId]);
  return <SubmissionPreview.SubmissionContainer onClick={onClick}>
    <SubmissionPreview.Timestamp>
      {`submitted on: ${timestamp ? timestamp.toDate() : 'loading'}`}
    </SubmissionPreview.Timestamp>
    <SubmissionPreview.Status>
      {`status: ${status}`}
    </SubmissionPreview.Status>
    <SubmissionPreview.Question>
      {`question: ${essayQuestion}`}
    </SubmissionPreview.Question>
    <SubmissionPreview.Action>
      {`action required: ${action}`}
    </SubmissionPreview.Action>
  </SubmissionPreview.SubmissionContainer>;
};

export default SubmissionDiv;