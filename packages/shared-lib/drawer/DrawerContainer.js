import styled from 'styled-components';

const DrawerContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 80%;
  left: ${props => props.show ? '0' : 'calc(-1*80%)'};
  @media (min-width: ${props => props.theme.dim.phoneWidth}px) {
    width: 30%;
    left: ${props => props.show ? '0' : 'calc(-1*30%)'};
  }
  background: white;
  transition: left 0.2s;
  overflow: auto;
`;

export default DrawerContainer;