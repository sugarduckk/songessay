import React, { Suspense, lazy } from 'react';
import { NavBar, NavSpace } from 'shared-lib/nav';
import { FullLayout, NavBarContentLayour, CenterLayout } from 'shared-lib/layout';
import { Route, Link, Redirect, Switch, useHistory } from 'react-router-dom';
import { BlankButton, HollowButton } from 'shared-lib/button';
import { TitleDiv } from 'shared-lib/component';
import HomeRoute from './HomeRoute';

const LoginRoute = lazy(() => import('./LoginRoute'));
const RegisterRoute = lazy(() => import('./RegisterRoute'));

const NonAuthRoute = props => {
  const history = useHistory();
  const goToLogin = React.useCallback(e => {
    history.push('/login');
  }, [history]);
  const goToRegister = React.useCallback(e => {
    history.push('/register');
  }, [history]);
  return <FullLayout>
    <NavBar>
      <NavSpace>
        <Route exact path='/login'>
          <TitleDiv>Login</TitleDiv>
        </Route>
        <Route exact path='/register'>
          <TitleDiv>Register a new account</TitleDiv>
        </Route>
      </NavSpace>
      <BlankButton onClick={goToLogin}>login</BlankButton>
      <HollowButton onClick={goToRegister}>register</HollowButton>
    </NavBar>
    <NavBarContentLayour>
      <CenterLayout>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path='/'>
              <HomeRoute />
            </Route>
            <Route exact path='/login'>
              <LoginRoute />
            </Route>
            <Route exact path='/register'>
              <RegisterRoute />
            </Route>
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Suspense>
      </CenterLayout>
    </NavBarContentLayour>
  </FullLayout>;
};

export default NonAuthRoute;