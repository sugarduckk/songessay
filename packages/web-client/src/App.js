import React from 'react';
import useGlobalState from './hook/useGlobalState';
import { useDispatch } from 'react-redux';
import useAuthState from 'firebase-wrapper/auth/useAuthState';
import { setState } from './redux/actions';
import AuthRoute from './route/AuthRoute';
import NonAuthRoute from './route/NonAuthRoute';
import { ThemeProvider, GlobalStyle } from 'shared-lib/core';
import theme from './res/theme';
import { LoadingScreen, DialogScreen } from 'shared-lib/screen';
import useNoScroll from './hook/useNoScroll';
import { BrowserRouter } from 'react-router-dom';
import useRemoveDialog from './hook/useRemoveDialog';

const App = props => {
  const { user, userLoaded, dialogScreens } = useGlobalState();
  const dispatch = useDispatch();
  const handleUser = React.useCallback(user => {
    dispatch(setState({
      user,
      userLoaded: true,
      userDoc: undefined
    }));
  }, [dispatch]);
  useAuthState(handleUser);
  const removeDialog = useRemoveDialog();
  const noScroll = useNoScroll();
  const appContent = React.useMemo(() => {
    if (!userLoaded) {
      return <LoadingScreen text='authenticating' />;
    }
    if (user) {
      return <AuthRoute />;
    }
    return <NonAuthRoute />;
  }, [user, userLoaded]);
  return <ThemeProvider theme={theme}>
    <GlobalStyle noScroll={noScroll} />
    <BrowserRouter>
      <DialogScreen dialog={dialogScreens[0]} removeDialog={removeDialog} />
      {appContent}
    </BrowserRouter>
  </ThemeProvider>;
};

export default App;