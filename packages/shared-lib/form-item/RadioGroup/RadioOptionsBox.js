import styled from 'styled-components';

const RadioOptionsBox = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${props => props.theme.dim.phoneWidth}px) {
    flex-direction: row;
  }
  margin: ${props => props.theme.dim.formItemMargin}px;
  padding: 0.75em;
  border: 1px solid lightgrey;
  border-radius: ${props => props.theme.dim.borderRadius}px;
`;

export default RadioOptionsBox;