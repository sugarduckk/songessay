import React from 'react';

const useMounted = () => {
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return React.useCallback(() => mounted.current, []);
};

export default useMounted;