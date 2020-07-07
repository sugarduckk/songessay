import React from 'react';
import NavSpaceContainer from './NavSpaceContainer';

const NavSpace = ({ children }) => {
  return <NavSpaceContainer>
    {children}
  </NavSpaceContainer>;
};

export default NavSpace;