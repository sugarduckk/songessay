import React from 'react';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  position: fixed;
  top: ${props => props.show ? '0' : `-${props.theme.dim.navBarHeight}px`};
  left: 0;
  height: ${props => props.theme.dim.navBarHeight}px;
  width: 100%;
  background: ${props => props.theme.color.primary};
  z-index: 2;
  transition: top 0.15s;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.4);
`;

const NavBar = props => {
  const [prevScrollPos, setPrevScrollPos] = React.useState(window.pageYOffset);
  const [show, setShow] = React.useState(true);
  const scrollHandler = React.useCallback(e => {
    const currentScrollPos = window.pageYOffset;
    if ((prevScrollPos < currentScrollPos || currentScrollPos == 0) && !show) {
      setShow(true);
    }
    else if (prevScrollPos > currentScrollPos && currentScrollPos !== 0 && show) {
      setShow(false);
    }
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos, show]);
  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);
  return <NavBarContainer show={show}>
    {props.children}
  </NavBarContainer>;
};

export default NavBar;