import styled from 'styled-components';
import CenterLayout from './CenterLayout';

const BottomBarCenterLayout = styled(CenterLayout)`
  padding-bottom: ${props => props.theme.dim.navBarHeight}px;
`;

export default BottomBarCenterLayout;