import React from 'react';
import { CustomDialog, MessageContainer, ButtonArea } from 'shared-lib/dialog';
import useSubmitEssayData from 'firebase-wrapper/firestore/useSubmitEssayData';
import useGlobalState from '../../../../hook/useGlobalState';
import { LightButton } from 'shared-lib/button';
import useDismissDialog from '../../../../hook/useDismissDialog';

const UploadEssayDialog = ({ values, resolve, reject }) => {
  const [messages, setMessages] = React.useState([]);
  const [taskProgresses, setTaskProgresses] = React.useState(values.essayValues.fileUploads.map(f => 0));
  const [disabled, setDisabled] = React.useState(true);
  const dismissDialog = useDismissDialog();
  const { user, userDoc } = useGlobalState();
  const handleStatus = React.useCallback((status, payload) => {
    switch (status) {
      case 'UPLOAD_SUBMISSION': {
        setMessages(m => [...m, 'Uploading essay...']);
        break;
      }
      case 'UPLOAD_FILES': {
        setMessages(m => [...m, 'Uploading file(s)...']);
        break;
      }
      case 'UPLOAD_PROGRESS': {
        const { index, file, progress } = payload;
        setTaskProgresses(pre => {
          const cur = [...pre];
          cur[index] = progress;
          return cur;
        });
        break;
      }
      case 'FILES_UPLOADED': {
        setMessages(m => [...m, 'File(s) uploaded']);
        break;
      }
      case 'DONE': {
        setMessages(m => [...m, 'Done']);
        setDisabled(false);
        resolve();
        break;
      }
      default: {
        console.log(status, 'this status code is invalid.');
        break;
      }
    }
  }, [resolve]);
  useSubmitEssayData(user.uid, userDoc.profile, values, handleStatus);
  return <CustomDialog>
    <MessageContainer>
      <div>
        {values.essayValues.submitType === 'file' && <ul>
          {taskProgresses.map((p, i) => {
            return <li key={i}>{`uploaded ${p}%`}</li>;
          })}
        </ul>}
      </div>
      <div>
        {messages.map(m => <div key={m}>{m}</div>)}
      </div>
    </MessageContainer>
    <ButtonArea>
      <LightButton disabled={disabled} onClick={dismissDialog}>dismiss</LightButton>
    </ButtonArea>
  </CustomDialog>;
};

export default UploadEssayDialog;