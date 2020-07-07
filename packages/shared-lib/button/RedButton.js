import styled from 'styled-components';
import Button from './Button';

const RedButton = styled(Button)`
  background: ${props => (props.isInteracted && !props.disabled) ? props.theme.color.primaryDark : 'red'};
  border: 1px solid ${props => (props.isInteracted && !props.disabled) ? props.theme.color.primaryDark : 'red'};
`;

export default RedButton;