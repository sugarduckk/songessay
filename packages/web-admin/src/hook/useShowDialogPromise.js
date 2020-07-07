import React from 'react';
import { useDispatch } from "react-redux";
import { setDialogScreen } from "../redux/actions";

const useShowDialogPromise = (renderPromise) => {
  const dispatch = useDispatch();
  return React.useCallback((...args) => {
    return new Promise((resolve, reject) => {
      dispatch(setDialogScreen(() => renderPromise(resolve, reject, ...args)));
    });
  }, [dispatch, renderPromise]);
};

export default useShowDialogPromise;