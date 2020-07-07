import styled from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: ${props => props.theme.dim.borderRadius}px;
  color: white;
  padding: 0.75em;
  cursor: pointer;
  margin: ${props => props.theme.dim.formItemMargin}px;
  box-shadow: 0px 2px ${props => (props.isInteracted && !props.disabled) ? '4' : '2'}px 0px rgba(0,0,0,0.4);
  font-size: 1em;
  font-family : inherit;
  &:disabled {
    opacity: 0.4;
  }
`;

export default Button;