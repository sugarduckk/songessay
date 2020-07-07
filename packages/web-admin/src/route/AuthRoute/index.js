import React, { Suspense } from 'react';
import { FullLayout, NavBarContentLayour } from 'shared-lib/layout';
import { withRouter, Switch, Route } from 'react-router-dom';
import { NavBar, NavSpace, NavBarIconContainer } from 'shared-lib/nav';
import MenuListIcon from 'shared-lib/res/icons/MenuListIcon';
import useSetDrawer from '../../hook/useSetDrawer';
import AppDrawer from '../../component/AppDrawer';
import DashboardRoute from './DashboardRoute';
import FetchCollection from '../../component/FetchCollection';
import useAggregatedSubmissions from 'firebase-wrapper/firestore/useAggregatedSubmissions';
import { useDispatch } from 'react-redux';
import { setState } from '../../../../web-client/src/redux/actions';
import useGlobalState from '../../../../web-client/src/hook/useGlobalState';
import useSubmissionsCollectionGroupQuery from 'firebase-wrapper/firestore/query/useSubmissionsCollectionGroupQuery';
import RolesRoute from './RolesRoute';
import SubmissionRoute from './SubmissionRoute';
import PricingRoute from './PricingRoute';
import usePricingModel from 'firebase-wrapper/firestore/usePricingModel';
import DefaultPricingModel from 'shared-lib/res/constant/DefaultPricingModel';

const AuthRoute = withRouter(props => {
  const { submissionStatus } = useGlobalState();
  const dispatch = useDispatch();
  const openDrawer = useSetDrawer(true);
  const handleAggregatedSubmissions = React.useCallback(aggSubmissions => {
    dispatch(setState({
      aggSubmissions
    }));
  }, [dispatch]);
  useAggregatedSubmissions(handleAggregatedSubmissions);
  const handlePricingModel = React.useCallback(pricingModel => {
    if (pricingModel) {
      dispatch(setState({
        pricingModel,
        newPricingModel: pricingModel
      }));
    }
    else {
      dispatch(setState({
        pricingModel: DefaultPricingModel,
        newPricingModel: DefaultPricingModel
      }));
    }
  }, [dispatch]);
  usePricingModel(handlePricingModel);
  const submissionsCollectionGroup = useSubmissionsCollectionGroupQuery(submissionStatus);
  return <FullLayout>
    <FetchCollection collectionName='submissions' query={submissionsCollectionGroup} limit={20} />
    <NavBar>
      <NavBarIconContainer onClick={openDrawer}>
        <MenuListIcon fill='white' />
      </NavBarIconContainer>
      <AppDrawer />
      <NavSpace>

      </NavSpace>
    </NavBar>
    <NavBarContentLayour>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route exact path='/'>
            <DashboardRoute />
          </Route>
          <Route exact path='/roles'>
            <RolesRoute />
          </Route>
          <Route exact path='/pricing'>
            <PricingRoute />
          </Route>
          <Route exact path='/submission'>
            <SubmissionRoute />
          </Route>
        </Switch>
      </Suspense>
    </NavBarContentLayour>
  </FullLayout>;
});

export default AuthRoute;