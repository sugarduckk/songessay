import styled from "styled-components";
import BlankButton from "./BlankButton";

const LightButton = styled(BlankButton)`
  background: ${props => props.isInteracted ? 'rgba(0,0,0,.2)' : 'transparent'};
  border: none;
  color: black;
`;

export default LightButton;