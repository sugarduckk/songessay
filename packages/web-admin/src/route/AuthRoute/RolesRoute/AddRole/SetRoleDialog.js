import React from 'react';
import { CustomDialog, MessageContainer, ButtonArea } from 'shared-lib/dialog';
import { LightButton } from 'shared-lib/button';
import useAddRoleEffect from 'firebase-wrapper/function/useAddRoleEffect';
import useDismissDialog from '../../../../hook/useDismissDialog';

const SetRoleDialog = ({ values, resolve, reject }) => {
  const [disabled, setDisabled] = React.useState(true);
  const [messages, setMessages] = React.useState([]);
  const dismissDialog = useDismissDialog();
  const handleStatus = React.useCallback((status, payload) => {
    switch (status) {
      case 'CHECKING_USER':
        setMessages(m => [...m, 'Checking if user exists...']);
        break;
      case 'CREATING_USER':
        setMessages(m => [...m, 'User does not exist, creating new user...']);
        break;
      case 'ADDING_ROLE':
        setMessages(m => [...m, 'User exists, adding granting permission...']);
        break;
      case 'DONE':
        setMessages(m => [...m, 'Done']);
        resolve();
        setDisabled(false);
        break;
      default:
        console.log('Unknown status', status);
    }
  }, [resolve]);
  useAddRoleEffect(values, handleStatus);
  return <CustomDialog>
    <MessageContainer>
      <div>
        {messages.map(m => <div key={m}>{m}</div>)}
      </div>
    </MessageContainer>
    <ButtonArea>
      <LightButton disabled={disabled} onClick={dismissDialog}>dismiss</LightButton>
    </ButtonArea>
  </CustomDialog>;
};

export default SetRoleDialog;