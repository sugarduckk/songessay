import React from 'react';
import { CustomDialog, MessageContainer, ButtonArea } from 'shared-lib/dialog';
import useDismissDialog from '../../../hook/useDismissDialog';
import useGlobalState from '../../../hook/useGlobalState';
import { useSetFirstLoginData } from 'firebase-wrapper/firestore';
import { LightButton } from 'shared-lib/button';

const FirstLoginDialog = ({ values, resolve, reject }) => {
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
  useSetFirstLoginData(user.uid, values, handleStatus);
  const dismissDialog = useDismissDialog();
  return <CustomDialog>
    <MessageContainer>{messages.map(m => <div key={m}>{m}</div>)}</MessageContainer>
    <ButtonArea>
      <LightButton disabled={disabled} onClick={dismissDialog}>dismiss</LightButton>
    </ButtonArea>
  </CustomDialog>;
};

export default FirstLoginDialog;