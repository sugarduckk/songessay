import styled from 'styled-components';
import Button from './Button';

const PrimaryButton = styled(Button)`
  background: ${props => props.isInteracted ? props.theme.color.primaryDark : props.theme.color.primary};
  border: 1px solid ${props => props.isInteracted ? props.theme.color.primaryDark : props.theme.color.primary};
`;

export default PrimaryButton;