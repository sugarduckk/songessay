import styled from 'styled-components';

const ClickableText = styled.button`
  border-radius: ${props => props.theme.dim.borderRadius}px;
  font-size: 1em;
  color: grey;
  padding: 0.25em;
  cursor: pointer;
  margin: ${props => props.theme.dim.formItemMargin}px;
  text-align: center;
  color: ${props => props.isInteracted ? props.theme.color.primary : 'black'};
  border: none;
  background: none;
  font-family: inherit;
  width: fit-content;
  margin: 0 auto;
`;

export default ClickableText;