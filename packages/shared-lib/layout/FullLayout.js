import styled from "styled-components";

const FullLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.color.background};
`;

export default FullLayout;