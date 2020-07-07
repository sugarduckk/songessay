import React from 'react';
import DialogContainer from '../DialogContainer';

const CustomDialog = props => {
  return <DialogContainer>
    {props.children}
  </DialogContainer>;
};

export default CustomDialog;