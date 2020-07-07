import styled from "styled-components";

const DialogContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: ${props => props.theme.color.background};
  padding: 16px;
  border-radius: 16px;
  max-height: 90vh;
  max-width: 90vw;
  min-width: 80vw;
  @media (min-width: ${props => props.theme.dim.phoneWidth}px) {
    min-width: 60vw;
  }
  overflow: auto;
`;

export default DialogContainer;