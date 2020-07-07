import styled, { css } from 'styled-components';
import withSyntheticEvents from '../hoc/withSyntheticEvents';

const NavBarIconContainer = withSyntheticEvents(styled.div`
  height: 100%;
  width: ${props => props.theme.dim.navBarHeight}px;
  padding: 0 ${props => props.theme.dim.navBarIconPadding}px;
  box-sizing: border-box;
  cursor: pointer;
  ${props => props.isInteracted && css`
    transform: scale(1.2);
  `}
`);

export default NavBarIconContainer;