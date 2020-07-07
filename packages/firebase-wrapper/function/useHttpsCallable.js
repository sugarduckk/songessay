import React from 'react';
import { fn } from "..";

const useHttpsCallable = (functionName) => {
  return React.useMemo(() => {
    return fn.httpsCallable(functionName);
  }, [functionName]);
};

export default useHttpsCallable;