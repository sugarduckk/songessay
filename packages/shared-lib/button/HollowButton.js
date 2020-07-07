import styled from 'styled-components';
import Button from './Button';

const HollowButton = styled(Button)`
  background: ${props => props.isInteracted ? 'rgba(255,255,255,0.3)' : 'transparent'};
  border: 1px solid white;
`;

export default HollowButton;