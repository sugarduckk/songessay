import React from 'react';
import { fs } from '..';

const listenToSubmission = (uid, submissionId) => {
  return fs.collection('users').doc(uid).collection('submissions').doc(submissionId);
};

export default listenToSubmission;