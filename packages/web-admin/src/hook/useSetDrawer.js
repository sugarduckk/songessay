import React from 'react';
import { useDispatch } from 'react-redux';
import { setState } from '../redux/actions';

const useSetDrawer = (drawerOpen) => {
  const dispatch = useDispatch();
  return React.useCallback(e => {
    dispatch(setState({
      drawerOpen
    }));
  }, [dispatch, drawerOpen]);
};

export default useSetDrawer;