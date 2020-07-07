import React from 'react';
import useGlobalState from '../useGlobalState';
import useUpdateDisplay from 'firebase-wrapper/firestore/useUpdateDisplay';
import useDismissDialog from '../useDismissDialog';
import { CustomDialog, MessageContainer, ButtonArea } from 'shared-lib/dialog';
import { LightButton } from 'shared-lib/button';

const DisplayUploadDialog = ({ values, resolve, reject }) => {
  const [messages, setMessages] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const { user } = useGlobalState();
  const handleStatus = React.useCallback((status, payload) => {
    switch (status) {
      case 'CANVAS_TO_BLOB': {
        setMessages(m => [...m, 'Preparing profile image']);
        break;
      }
      case 'UPLOAD_STARTED': {
        setMessages(m => [...m, 'Uploading profile image (0%)']);
        break;
      }
      case 'UPLOAD_PROGRESS': {
        setMessages(m => {
          const temp = [...m];
          temp[temp.length - 1] = `Uploading profile image (${payload.progress}%)`;
          return temp;
        });
        break;
      }
      case 'UPLOAD_COMPLETE': {
        setMessages(m => [...m, 'Profile image uploaded']);
        break;
      }
      case 'SETTING_PROFILE': {
        setMessages(m => [...m, 'Updating database']);
        break;
      }
      case 'DONE': {
        setMessages(m => [...m, 'Done']);
        setDisabled(false);
        resolve();
        break;
      }
      case 'ERROR': {
        setMessages(m => [...m, `${payload.error.code}: ${payload.error.message}`]);
        reject(payload.error);
        break;
      }
      default: {
        console.log(status, 'this status code is invalid.');
        break;
      }
    }
  }, [resolve, reject]);
  useUpdateDisplay(user.uid, values, handleStatus);
  const dismissDialog = useDismissDialog();
  return <CustomDialog>
    <MessageContainer>{messages.map(m => <div key={m}>{m}</div>)}</MessageContainer>
    <ButtonArea>
      <LightButton disabled={disabled} onClick={dismissDialog}>dismiss</LightButton>
    </ButtonArea>
  </CustomDialog>;
};

export default DisplayUploadDialog;