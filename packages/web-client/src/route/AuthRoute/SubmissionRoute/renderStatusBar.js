import React from 'react';
import SubmissionStatus from 'firebase-wrapper/constant/SubmissionStatus';

const renderStatusBar = (submission, setScreenIndex) => {
  const { status } = submission;
  const children = [];
  children.push(<div key='status'>{status}</div>);
  switch (status) {
    case SubmissionStatus.PENDING_PAYMENT: {
      children.push(<button onClick={e => {
        setScreenIndex(1);
      }} key='make_a_payment'>make a payment</button>);
      break;
    }
    default: {
      break;
    }
  }
  return children;
};

export default renderStatusBar;