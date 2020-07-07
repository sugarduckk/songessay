import React from 'react';
import { LightButton } from '../../button';
import DialogContainer from '../DialogContainer';
import ButtonArea from '../ButtonArea';
import MessageContainer from '../MessageContainer';

const MessageDialog = ({ message, onDismiss }) => {
  return <DialogContainer>
    <MessageContainer>{message}</MessageContainer>
    <ButtonArea>
      <LightButton onClick={onDismiss}>dismiss</LightButton>
    </ButtonArea>
  </DialogContainer>;
};

export default MessageDialog;