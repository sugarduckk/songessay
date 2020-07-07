import React from 'react';
import { useHistory } from 'react-router-dom';
import SubmissionPreview from 'shared-lib/component/SubmissionPreview';
import SubmissionStatus from 'firebase-wrapper/constant/SubmissionStatus';

const SubmissionDiv = ({ submission, subId, owner }) => {
  const { essayQuestion, status, timestamp, action } = submission;
  const history = useHistory();
  const onClick = React.useCallback(e => {
    let screen;
    switch (status) {
      case SubmissionStatus.PAYMENT_REVIEW: {
        screen = 1;
        break;
      }
      default: {
        screen = 0;
        break;
      }
    }
    history.push({
      pathname: '/submission',
      search: `?owner=${owner}&subId=${subId}&screen=${screen}`
    });
  }, [history, owner, subId, status]);
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