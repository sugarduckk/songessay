import React, { Suspense, lazy } from 'react';
import useGlobalState from '../../hook/useGlobalState';
import { useUserDoc } from 'firebase-wrapper/firestore';
import { useDispatch } from 'react-redux';
import { setState } from '../../redux/actions';
import VerifyRoute from './VerifyRoute';
import { LoadingScreen } from 'shared-lib/screen';
import { FullLayout, NavBarContentLayour } from 'shared-lib/layout';
import { Route, Redirect, useHistory, withRouter, Switch } from 'react-router-dom';
import { NavBar, NavSpace, NavBarIconContainer } from 'shared-lib/nav';
import FirstLoginRoute from './FirstLoginRoute';
import MenuListIcon from 'shared-lib/res/icons/MenuListIcon';
import useSetDrawer from '../../hook/useSetDrawer';
import AppDrawer from '../../component/AppDrawer';
import AddIcon from 'shared-lib/res/icons/AddIcon';
import FetchCollection from '../../component/FetchCollection';
import useSubmissionQuery from 'firebase-wrapper/firestore/query/useSubmissionQuery';

const DashboardRoute = lazy(() => import('./DashboardRoute'));
const CreateSubmissionRoute = lazy(() => import('./CreateSubmissionRoute'));
const SettingRoute = lazy(() => import('./SettingRoute'));
const SubmissionRoute = lazy(() => import('./SubmissionRoute'));

const AuthRoute = withRouter(props => {
  const { user, userDoc } = useGlobalState();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleUserDoc = React.useCallback(userDoc => {
    dispatch(setState({ userDoc }));
  }, [dispatch]);
  useUserDoc(user.uid, handleUserDoc);
  const openDrawer = useSetDrawer(true);
  const createSubmission = React.useCallback(() => {
    history.push('/create_submission');
  }, [history]);
  const collectionName = React.useMemo(() => 'submissions', []);
  const submissionQuery = useSubmissionQuery(user.uid);
  const limit = React.useMemo(() => 3, []);
  if (!userDoc) {
    return <LoadingScreen text='loading user information' />;
  }
  if (!user.emailVerified) {
    return <VerifyRoute />;
  }
  if (userDoc.loginFirstTime) {
    return <FirstLoginRoute />;
  }
  return <FullLayout>
    <FetchCollection collectionName={collectionName} query={submissionQuery} limit={limit} />
    <NavBar>
      <NavBarIconContainer onClick={openDrawer}>
        <MenuListIcon fill='white' />
      </NavBarIconContainer>
      <AppDrawer />
      <NavSpace>

      </NavSpace>
      <NavBarIconContainer onClick={createSubmission}>
        <AddIcon fill='white' />
      </NavBarIconContainer>
    </NavBar>
    <NavBarContentLayour>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route exact path='/'>
            <DashboardRoute />
          </Route>
          <Route exact path='/create_submission'>
            <CreateSubmissionRoute />
          </Route>
          <Route exact path='/submission'>
            <SubmissionRoute />
          </Route>
          <Route exact path='/setting'>
            <SettingRoute />
          </Route>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Suspense>
    </NavBarContentLayour>
  </FullLayout>;
});

export default AuthRoute;