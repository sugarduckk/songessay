import styled from 'styled-components';

const Input = styled.input`
  margin: ${props => props.theme.dim.formItemMargin}px;
  padding: 0.75em;
  border: 1px solid lightgrey;
  border-radius: ${props => props.theme.dim.borderRadius}px;
  font-family: Sarabun;
  &:disabled {
    opacity: 0.4;
  }
`;

export default Input;