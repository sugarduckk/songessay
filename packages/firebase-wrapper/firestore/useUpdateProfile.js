import React from 'react';
const { fs } = require("..");

const useUpdateProfile = (uid, field) => {
  return React.useCallback(values => {
    return fs.collection('users').doc(uid).update({
      [`profile.${field}`]: values[field]
    });
  }, [uid, field]);
};

export default useUpdateProfile;