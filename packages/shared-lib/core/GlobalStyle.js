import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${props => props.noScroll ? 'hidden' : 'auto'};
    margin: 0;
    font-family: 'Prompt', sans-serif;
  }
`;

export default GlobalStyle;