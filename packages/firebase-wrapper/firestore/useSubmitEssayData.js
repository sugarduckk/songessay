import React from 'react';
import { fs, storage, serverTimestamp, storageStateChanged, increment } from "..";
import SubmissionStatus from '../constant/SubmissionStatus';
import UserAction from '../constant/UserAction';

const useSubmitEssayData = (uid, profile, values, handleStatus) => {
  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => {
    if (!submitted) {
      setSubmitted(true);
      const { essayValues, packageValues } = values;
      const { essayQuestion, submitType, fileUploads, essayText } = essayValues;
      var newSubmission = {
        status: SubmissionStatus.PENDING_PAYMENT,
        timestamp: serverTimestamp,
        action: UserAction.MAKE_PAYMENT,
        essayQuestion,
        submitType,
        sender: {
          uid,
          profile
        },
        ...packageValues
      };
      var submitEssay;
      const submissionRef = fs.collection('users').doc(uid).collection('submissions').doc();
      const submissionId = submissionRef.id;
      if (submitType === 'text') {
        handleStatus('UPLOAD_SUBMISSION');
        newSubmission.essayText = essayText;
        const batch = fs.batch();
        batch.set(fs.collection('users').doc(uid).collection('submissions').doc(submissionId), newSubmission);
        const SubmissionPendingPayment = "submissions." + SubmissionStatus.PENDING_PAYMENT;
        batch.update(fs.collection('users').doc(uid), {
          "submissions.total": increment(1),
          [SubmissionPendingPayment]: increment(1)
        });
        batch.update(fs.collection('aggregation').doc('submissions'), {
          "total": increment(1),
          [SubmissionStatus.PENDING_PAYMENT]: increment(1)
        });
        submitEssay = batch.commit();
      }
      else {
        handleStatus('UPLOAD_FILES');
        const userStorageRef = storage.ref(`users/${uid}`);
        const promises = [];
        fileUploads.forEach((file, index) => {
          const uploadTask = userStorageRef.child(`submissions/${submissionId}/${file.name}`).put(file);
          const onStateChanged = snapshot => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            handleStatus('UPLOAD_PROGRESS', {
              index,
              file,
              progress
            });
          };
          uploadTask.on(storageStateChanged, onStateChanged, (error) => {
            console.log(`error at ${index + 1}`, error.message);
          });
          promises.push(uploadTask);
        });
        submitEssay = Promise.all(promises).then(snapshots => {
          handleStatus('FILES_UPLOADED');
          const downloadUrlPromises = [];
          snapshots.forEach((snapshot, snapshotIndex) => {
            downloadUrlPromises.push(snapshot.ref.getDownloadURL());
          });
          return Promise.all(downloadUrlPromises);
        })
          .then(downloadUrls => {
            handleStatus('UPLOAD_SUBMISSION');
            const uploadedFiles = fileUploads.map((file, fileIndex) => {
              return {
                name: file.name,
                link: downloadUrls[fileIndex]
              };
            });
            const batch = fs.batch();
            batch.set(fs.collection('users').doc(uid).collection('submissions').doc(submissionId), {
              ...newSubmission,
              uploadedFiles
            });
            const SubmissionPendingPayment = "submissions." + SubmissionStatus.PENDING_PAYMENT;
            batch.update(fs.collection('users').doc(uid), {
              "submissions.total": increment(1),
              [SubmissionPendingPayment]: increment(1)
            });
            batch.update(fs.collection('aggregation').doc('submissions'), {
              "total": increment(1),
              [SubmissionStatus.PENDING_PAYMENT]: increment(1)
            });
            return batch.commit();
          });
      }
      submitEssay.then(() => {
        handleStatus('DONE');
      });
    }
  }, [uid, profile, values, handleStatus, submitted]);
};

export default useSubmitEssayData;