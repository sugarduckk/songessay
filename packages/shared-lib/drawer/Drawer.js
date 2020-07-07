import React from 'react';
import DimBackground from '../screen/DimBackground';
import DrawerContainer from './DrawerContainer';

const Drawer = ({ show, closeDrawer, children }) => {
  return <DimBackground show={show} onClick={closeDrawer}>
    <DrawerContainer show={show}>
      {children}
    </DrawerContainer>
  </DimBackground>;
};

export default Drawer;