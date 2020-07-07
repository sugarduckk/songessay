import styled from 'styled-components';

const AnotherContainer = styled.div`
  margin: ${props => props.theme.dim.formItemMargin}px;
  @media (min-width: ${props => props.theme.dim.phoneWidth}px) {
    padding: 0 25%;
  }
`;

export default AnotherContainer;