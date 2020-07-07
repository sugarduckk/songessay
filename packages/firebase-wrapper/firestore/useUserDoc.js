import React from 'react';
import { fs } from '..';

const useUserDoc = (uid, handleUserDoc) => {
  React.useEffect(() => {
    return fs.collection('users').doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          handleUserDoc(doc.data());
        }
      });
  }, [uid, handleUserDoc]);
};

export default useUserDoc;