import styled from 'styled-components';

const BottomBarScreen = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
`;

export default BottomBarScreen;