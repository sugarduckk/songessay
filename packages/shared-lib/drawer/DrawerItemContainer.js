import styled, { css } from 'styled-components';

const DrawerItemContainer = styled.div`
  height: ${props => props.theme.dim.navBarHeight}px;
  cursor: pointer;
  margin: 4%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.inactiveText};
  -webkit-tap-highlight-color: transparent;
  ${props => {
    if (props.isInteracted) {
      return css`
        background: linear-gradient(90deg, ${props => props.theme.color.themeOneDark} 0%, ${props => props.theme.color.themeOneLight} 100%);
        color: white;
        outline: 0;
      `;
    }
  }}
  transition: 0.4s;
`;

export default DrawerItemContainer;