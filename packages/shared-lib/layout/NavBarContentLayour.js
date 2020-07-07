import styled from "styled-components";

const NavBarContentLayour = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${props => props.theme.color.background};
  padding-top: ${props => props.theme.dim.navBarHeight}px;
  box-sizing: border-box;
  width: 100%;
`;

export default NavBarContentLayour;