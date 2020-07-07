import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 70vw;
  @media (min-width: ${props => props.theme.dim.phoneWidth}px) {
    width: 30vw;
  }
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default LoaderContainer;