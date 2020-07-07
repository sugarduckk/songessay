import React from 'react';

const useVisibilityChange = (handler) => {
  React.useEffect(() => {
    window.addEventListener('visibilitychange', handler);
    return () => {
      window.removeEventListener('visibilitychange', handler);
    };
  });
};

export default useVisibilityChange;