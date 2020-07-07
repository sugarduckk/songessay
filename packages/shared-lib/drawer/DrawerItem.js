import React from 'react';
import useSyntheticEvents from '../hook/useSyntheticEvents';
import DrawerItemContainer from './DrawerItemContainer';
import DrawerItemIconContainer from './DrawerItemIconContainer';
import { useTheme } from 'styled-components';

const DrawerItem = ({ item, currentRoute }) => {
  const { Icon, label, onClick } = item;
  const [itemDom, handlers] = useSyntheticEvents();
  const theme = useTheme();

  return <DrawerItemContainer onClick={onClick} {...handlers} isInteracted={itemDom.isInteracted || currentRoute} >
    <DrawerItemIconContainer>
      <Icon fill={itemDom.isInteracted || currentRoute ? 'white' : theme.color.inactiveText} />
    </DrawerItemIconContainer>
    <h3>{label}</h3>
  </DrawerItemContainer>;
};

export default DrawerItem;