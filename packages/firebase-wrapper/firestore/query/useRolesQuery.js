import React from 'react';
import { fs } from '../..';

const useRolesQuery = () => {
  return React.useMemo(() => {
    return fs.collection('roles').orderBy('createdTimestamp', 'desc');
  }, []);
};

export default useRolesQuery;