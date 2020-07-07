import React from 'react';
import { fs, storage, storageStateChanged } from "..";
import scaledownImgToCanvas from '../util/scaledownImgToCanvas';

const useUpdateDisplay = (uid, values, handleStatus) => {
  React.useEffect(() => {
    const { profile } = values;
    const { img, crop } = profile;
    var imgCanvas = scaledownImgToCanvas(img, crop);
    handleStatus('CANVAS_TO_BLOB');
    imgCanvas.toBlob(blob => {
      handleStatus('UPLOAD_STARTED');
      const ext = blob.type.split('/')[1];
      const userStorageRef = storage.ref(`users/${uid}`);
      const profileStorageRef = userStorageRef.child(`profile/profile_image.${ext}`);
      const uploadTask = profileStorageRef.put(blob);
      const onStateChanged = snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        handleStatus('UPLOAD_PROGRESS', {
          progress
        });
      };
      uploadTask.on(storageStateChanged, onStateChanged, error => {
        handleStatus('ERROR', {
          error
        });
      }, () => {
        handleStatus('UPLOAD_COMPLETE');
        profileStorageRef.getDownloadURL()
          .then(downloadUrl => {
            handleStatus('SETTING_PROFILE');
            return fs.collection('users').doc(uid).update({
              "profile.display": downloadUrl
            });
          })
          .then(() => {
            handleStatus('DONE');
          });
      });
    });
  }, [uid, values, handleStatus]);
};

export default useUpdateDisplay;