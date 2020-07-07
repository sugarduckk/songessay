import styled from 'styled-components';

const TextArea = styled.textarea`
  margin: ${props => props.theme.dim.formItemMargin}px;
  padding: 0.75em;
  border: 1px solid lightgrey;
  border-radius: ${props => props.theme.dim.borderRadius}px;
  &:disabled {
    opacity: 0.4;
  }
  resize: none;
  height: 4em;
`;

export default TextArea;