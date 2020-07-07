import React from 'react';
import qs from 'query-string';
import EssayScreen from './EssayScreen';
import PaymentScreen from './PaymentScreen';
import ActionsScreen from './ActionsScreen';
import MarkingScreen from './MarkingScreen';
import renderStatusBar from './renderStatusBar';
import { useHistory, useLocation } from 'react-router-dom';
import useGlobalState from '../../../hook/useGlobalState';
import useActionsQuery from 'firebase-wrapper/firestore/query/useActionsQuery';
import useFirestoreCollection from 'firebase-wrapper/firestore/useFirestoreCollection';
import usePaymentsQuery from 'firebase-wrapper/firestore/query/usePaymentsQuery';
import BottomBar from 'shared-lib/component/BottomBar';
import BottomBarScreen from 'shared-lib/component/BottomBarScreen';
import StatusBar from 'shared-lib/component/StatusBar';
import BottomBarCenterLayout from 'shared-lib/layout/BottomBarCenterLayout';
import listenToSubmission from 'firebase-wrapper/firestore/listenToSubmission';
import useSetSubmissionScreen from './useSetSubmissionScreen';
import bottomBarScreens from './bottomBarScreens';


const SubmissionRoute = props => {
  const history = useHistory();
  const location = useLocation();
  const { user, submissionsBatches } = useGlobalState();
  const [screenIndex, setScreenIndex] = React.useState();
  const [submissionId, setSubmissionId] = React.useState();
  const [submission, setSubmission] = React.useState();
  const setSubmissionScreen = useSetSubmissionScreen(submissionId);
  React.useEffect(() => {
    const { subId, screen } = qs.parse(location.search);
    if (subId) {
      setSubmissionId(subId);
    }
    else {
      history.replace({
        pathname: '/'
      });
    }
    if (screen) {
      setScreenIndex(parseInt(screen));
    }
    else if (subId) {
      setSubmissionScreen(0);
    }
  }, [history, location.search, setSubmissionScreen]);

  const actionsQuery = useActionsQuery(user.uid, submissionId);
  const actions = useFirestoreCollection(actionsQuery);

  const paymentsQuery = usePaymentsQuery(user.uid, submissionId);
  const payments = useFirestoreCollection(paymentsQuery);

  React.useEffect(() => {
    if (submissionsBatches && submissionsBatches[0].length > 0 && submissionId) {
      var result;
      for (let batchIndex = 0; batchIndex < submissionsBatches.length; batchIndex++) {
        let batch = submissionsBatches[batchIndex];
        const index = batch.map(s => s.id).indexOf(submissionId);
        if (index >= 0) {
          result = batch[index].data;
          break;
        }
      }
      if (result) {
        setSubmission(result);
      }
      else {
        const { uid } = user;
        return listenToSubmission(uid, submissionId).onSnapshot(doc => {
          if (doc.exists) {
            setSubmission(doc.data());
          }
          else {
            history.replace({
              pathname: '/'
            });
          }
        });
      }
    }
  }, [history, submissionsBatches, submissionId, user]);
  const status = React.useMemo(() => submission ? submission.status : null, [submission]);
  return <>
    {submission && <>
      <BottomBarCenterLayout>
        <StatusBar>{renderStatusBar(submission, setSubmissionScreen)}</StatusBar>
        <BottomBarScreen show={screenIndex === 0}>
          <EssayScreen submission={submission} />
        </BottomBarScreen>
        <BottomBarScreen show={screenIndex === 1}>
          <PaymentScreen status={status} submissionId={submissionId} payments={payments} />
        </BottomBarScreen>
        <BottomBarScreen show={screenIndex === 2}>
          <MarkingScreen />
        </BottomBarScreen>
        <BottomBarScreen show={screenIndex === 3}>
          <ActionsScreen actions={actions} />
        </BottomBarScreen>
      </BottomBarCenterLayout>
      <BottomBar screens={bottomBarScreens} screenIndex={screenIndex} setScreenIndex={setSubmissionScreen} />
    </>}
  </>;
};

export default SubmissionRoute;