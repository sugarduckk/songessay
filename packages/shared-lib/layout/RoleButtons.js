import styled from 'styled-components';

const RoleButtons = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  opacity: ${props => props.show ? '1' : '0'};
  height: ${props => (props.show && props.height) ? `${props.height}px` : '0'};
  transition: 0.2s;
  overflow: hidden;
`;

export default RoleButtons;