import styled from 'styled-components';

const DrawerItemIconContainer = styled.div`
  height: ${props => props.theme.dim.navBarHeight}px;
  width: ${props => props.theme.dim.navBarHeight}px;
  padding: ${props => props.theme.dim.navBarPadding * 1.5}px;
  box-sizing: border-box;
`;

export default DrawerItemIconContainer;