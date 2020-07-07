import React from 'react';
import { fs, storage, serverTimestamp, storageStateChanged, increment } from '..';
import SubmissionStatus from '../constant/SubmissionStatus';
import UserAction from '../constant/UserAction';
import PaymentStatus from '../constant/PaymentStatus';

const useUploadPayment = (uid, submissionId, values, handleStatus) => {
  const [uploaded, setUploaded] = React.useState(false);
  React.useEffect(() => {
    if (!uploaded) {
      setUploaded(true);
      const { fileUploads } = values;
      handleStatus('UPLOAD_FILES');
      const userStorageRef = storage.ref(`users/${uid}`);
      const paymentDoc = {
        by: uid,
        timestamp: serverTimestamp,
        status: PaymentStatus.PENDING_REVIEW
      };
      const userRef = fs.collection('users').doc(uid);
      const submissionRef = userRef.collection('submissions').doc(submissionId);
      const paymentRef = submissionRef.collection('payments').doc();
      const paymentId = paymentRef.id;
      const promises = [];
      fileUploads.forEach((file, index) => {
        const uploadTask = userStorageRef.child(`payments/${paymentId}/${file.name}`).put(file);
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
        Promise.all(promises).then(snapshots => {
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
            const makePaymentTransaction = transaction => {
              return transaction.get(submissionRef).then(submissionDoc => {
                if (!submissionDoc.exists) {
                  throw new Error("Submission document does not exist!");
                }
                const submission = submissionDoc.data();
                if (submission.status !== SubmissionStatus.PENDING_PAYMENT) {
                  throw new Error("Payment is not allow");
                }
                const actionRef = submissionRef.collection('actions').doc();
                const action = {
                  timestamp: serverTimestamp,
                  action: UserAction.MAKE_PAYMENT,
                  by: uid
                };
                transaction.set(paymentRef, {
                  ...paymentDoc,
                  uploadedFiles
                });
                transaction.update(submissionRef, {
                  status: SubmissionStatus.PAYMENT_REVIEW
                });
                const SubmissionPendingPayment = "submissions." + SubmissionStatus.PENDING_PAYMENT;
                const SubmissionPaymentReview = "submissions." + SubmissionStatus.PAYMENT_REVIEW;
                transaction.update(userRef, {
                  [SubmissionPendingPayment]: increment(-1),
                  [SubmissionPaymentReview]: increment(1)
                });
                transaction.update(fs.collection('aggregation').doc('submissions'), {
                  [SubmissionStatus.PENDING_PAYMENT]: increment(-1),
                  [SubmissionStatus.PAYMENT_REVIEW]: increment(1),
                });
                transaction.set(actionRef, action);
              });
            };
            return fs.runTransaction(makePaymentTransaction);
          })
          .then(() => {
            handleStatus('DONE');
          });
      });
    }
  }, [uploaded, uid, submissionId, values, handleStatus]);
};

export default useUploadPayment;