import React from 'react';
import BottomBarContainer from './BottomBarContainer';
import BottomBarItem from './BottomBarItem';
import { useTheme } from 'styled-components';

const BottomBar = ({ screens, screenIndex, setScreenIndex }) => {
  const theme = useTheme();
  return <BottomBarContainer>
    {screens.map((screen, index) => {
      const onClick = e => {
        setScreenIndex(index);
      };
      const selected = screenIndex === index;
      return <BottomBarItem key={index} onClick={onClick} selected={selected}>
        <screen.Icon height='50%' fill={selected ? theme.color.themeOneDark : 'white'} />
        {screen.label}
      </BottomBarItem>;
    })}
  </BottomBarContainer>;
};

export default BottomBar;