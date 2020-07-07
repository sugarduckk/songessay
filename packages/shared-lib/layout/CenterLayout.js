import styled from 'styled-components';

const CenterLayout = styled.div`
  position: absolute;
  width: 100%;
  @media (min-width: ${props => props.theme.dim.phoneWidth}px) {
    width: 60%;
  }
  left: 50%;
  transform: translate(-50%);
`;

export default CenterLayout;