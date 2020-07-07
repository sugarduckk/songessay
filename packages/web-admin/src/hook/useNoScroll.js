import React from 'react';
import useGlobalState from './useGlobalState';

const useNoScroll = () => {
  const { dialogScreens, drawerOpen } = useGlobalState();
  const noScroll = React.useMemo(() => {
    let promptShow = false;
    if (dialogScreens.length > 0) {
      promptShow = dialogScreens[0].show;
    }
    return promptShow;
  }, [dialogScreens]);
  return noScroll || drawerOpen;
};

export default useNoScroll;