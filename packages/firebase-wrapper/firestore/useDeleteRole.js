import React from 'react';
import { fs } from '..';

const useDeleteRole = (uid) => {
  return React.useCallback(() => {
    return fs.collection('roles').doc(uid).delete();
  }, [uid]);
};

export default useDeleteRole;