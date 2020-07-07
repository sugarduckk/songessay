import React from 'react';
import { ThemeProvider, GlobalStyle } from 'shared-lib/core';
import theme from './res/theme';
import useGlobalState from './hook/useGlobalState';
import useNoScroll from './hook/useNoScroll';
import { useDispatch } from 'react-redux';
import useAuthState from 'firebase-wrapper/auth/useAuthState';
import { setState } from './redux/actions';
import { LoadingScreen, DialogScreen } from 'shared-lib/screen';
import AuthRoute from './route/AuthRoute';
import NonAuthRoute from './route/NonAuthRoute';
import { BrowserRouter } from 'react-router-dom';
import useRemoveDialog from './hook/useRemoveDialog';
import { auth } from 'firebase-wrapper';
import { useLogout } from 'firebase-wrapper/auth';
import useShowMessageDialog from './hook/useShowMessageDialog';

const App = props => {
  const { user, userLoaded, dialogScreens, claims, claimsLoaded } = useGlobalState();
  const logout = useLogout();
  const dispatch = useDispatch();
  const removeDialog = useRemoveDialog();
  const forwordMessage = React.useCallback(message => message, []);
  const showMessageDialog = useShowMessageDialog(forwordMessage);
  const handleUser = React.useCallback(user => {
    dispatch(setState({
      user,
      userLoaded: true,
      userDoc: undefined
    }));
  }, [dispatch]);
  useAuthState(handleUser);
  React.useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        const { claims } = idTokenResult;
        if (!claims.role) {
          logout().then(() => {
            showMessageDialog('Permission required.');
          });
        }
        dispatch(setState({
          claims,
          claimsLoaded: true
        }));
      });
    }
  }, [user, dispatch, logout, showMessageDialog]);
  const noScroll = useNoScroll();
  const appContent = React.useMemo(() => {
    if (!userLoaded) {
      return <LoadingScreen text='authenticating' />;
    }
    if (user) {
      if (!claimsLoaded) {
        return <LoadingScreen text='checking permissions' />;
      }
      return <AuthRoute />;
    }
    return <NonAuthRoute />;
  }, [user, userLoaded, claimsLoaded]);
  return <ThemeProvider theme={theme}>
    <GlobalStyle noScroll={noScroll} />
    <BrowserRouter>
      <DialogScreen dialog={dialogScreens[0]} removeDialog={removeDialog} />
      {appContent}
    </BrowserRouter>
  </ThemeProvider>;
};

export default App;