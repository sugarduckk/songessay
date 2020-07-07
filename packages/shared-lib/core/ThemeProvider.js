import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import DefaultTheme from './DefaultTheme';
import mergeDeep from '../util/mergeDeep';

const ThemeProvider = ({ theme, children }) => {
  const mergedTheme = React.useMemo(() => {
    if (theme) {
      return mergeDeep(DefaultTheme, theme);
    }
    else {
      return DefaultTheme;
    }
  }, [theme]);
  return <StyledThemeProvider theme={mergedTheme}>
    {children}
  </StyledThemeProvider>;
};

export default ThemeProvider;