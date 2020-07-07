import React from 'react';
import { CenterLayout } from 'shared-lib/layout';
import useGlobalState from '../../../hook/useGlobalState';
import SubmissionStatus from 'firebase-wrapper/constant/SubmissionStatus';
import StatusMenu from 'shared-lib/component/StatusMenu';
import { useDispatch } from 'react-redux';
import { setState } from '../../../redux/actions';
import SubmissionDiv from './SubmissionDiv';

const DashboardRoute = props => {
  const dispatch = useDispatch();
  const { submissionsBatches, aggSubmissions, submissionStatus } = useGlobalState();
  return <>
    {aggSubmissions && <StatusMenu.OuterContainer>
      <StatusMenu.InnerContainer>
        {Object.keys(SubmissionStatus).map(key => {
          const onClick = e => {
            dispatch(setState({
              submissionStatus: key
            }));
          };
          return <StatusMenu.Card key={key} onClick={onClick} selected={key === submissionStatus}>
            <div>{SubmissionStatus[key]}</div>
            <div>{aggSubmissions[key]}</div>
          </StatusMenu.Card>;
        })}
      </StatusMenu.InnerContainer>
    </StatusMenu.OuterContainer>}
    <CenterLayout>
      {submissionsBatches && submissionsBatches.length > 0 &&
        submissionsBatches.map((batch, batchIndex) => {
          return batch.map((doc, docIndex) => {
            return <SubmissionDiv key={doc.id} subId={doc.id} submission={doc.data} owner={doc.data.sender.uid} />;
          });
        })}
    </CenterLayout>
  </>;
};

export default DashboardRoute;