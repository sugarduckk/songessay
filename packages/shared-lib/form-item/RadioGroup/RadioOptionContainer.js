import styled from 'styled-components';

const RadioOptionContainer = styled.label`
  text-align: center;
  flex: 1;
  border-radius: ${props => props.theme.dim.borderRadius}px;
  background: ${props => props.checked ? props.theme.color.primary : 'white'};
  border: 1px solid ${props => props.theme.color.primary};
  color: ${props => props.checked ? 'white' : props.theme.color.primary};
  padding: 0.75em;
  cursor: pointer;
  margin: ${props => props.theme.dim.formItemMargin}px;
`;

export default RadioOptionContainer;