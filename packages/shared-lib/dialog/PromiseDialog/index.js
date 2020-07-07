import React from 'react';
import { LightButton } from '../../button';
import DialogContainer from '../DialogContainer';
import ButtonArea from '../ButtonArea';
import MessageContainer from '../MessageContainer';
import useMounted from '../../hook/useMounted';

const PromiseDialog = ({ message, onDismiss, getPromise, onSuccess, onError }) => {
  const [disabled, setDisabled] = React.useState(true);
  const mounted = useMounted();
  React.useEffect(() => {
    console.log("run promise dialog");
    getPromise()
      .then((...args) => {
        if (onSuccess) {
          onSuccess(...args);
        }
        if (mounted()) {
          setDisabled(false);
        }
      })
      .catch((...args) => {
        if (onError) {
          onError(...args);
        }
        if (mounted()) {
          setDisabled(false);
        }
      });
  }, [getPromise, mounted, onError, onSuccess]);
  return <DialogContainer>
    <MessageContainer>{message}</MessageContainer>
    <ButtonArea>
      <LightButton disabled={disabled} onClick={onDismiss}>dismiss</LightButton>
    </ButtonArea>
  </DialogContainer>;
};

export default PromiseDialog;