import React from 'react';
import DimBackground from "../DimBackground";
import DialogContainer from './DialogContainer';

const DialogScreen = ({ dialog, removeDialog }) => {
  var render, show;
  if (dialog) {
    render = dialog.render;
    show = dialog.show;
  }
  const onTransitionEnd = React.useCallback(e => {
    if (!show) {
      removeDialog();
    }
  }, [show, removeDialog]);
  return <DimBackground show={show} onTransitionEnd={onTransitionEnd}>
    <DialogContainer>
      {render && render()}
    </DialogContainer>
  </DimBackground>;
};

export default DialogScreen;