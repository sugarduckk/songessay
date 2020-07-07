import React from 'react';
import { LightButton } from '../../button';
import DialogContainer from '../DialogContainer';
import ButtonArea from '../ButtonArea';
import MessageContainer from '../MessageContainer';

const DecisionDialog = ({ message, onNo, onYes }) => {
  return <DialogContainer>
    <MessageContainer>{message}</MessageContainer>
    <ButtonArea>
      <LightButton onClick={onNo}>no</LightButton>
      <LightButton onClick={onYes}>yes</LightButton>
    </ButtonArea>
  </DialogContainer>;
};

export default DecisionDialog;