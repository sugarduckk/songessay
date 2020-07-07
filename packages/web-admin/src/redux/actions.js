const ACTION_TYPES = {
  SET_STATE: 'SET_STATE',
  SET_DIALOG_SCREEN: 'SET_DIALOG_SCREEN',
  DISMISS_DIALOG_SCREEN: 'DISMISS_DIALOG_SCREEN',
  REMOVE_DIALOG_SCREEN: 'REMOVE_DIALOG_SCREEN'
};

export const setState = state => {
  return {
    type: ACTION_TYPES.SET_STATE,
    state
  };
};

export const setDialogScreen = render => {
  return {
    type: ACTION_TYPES.SET_DIALOG_SCREEN,
    render
  };
};

export const dismissDialogScreen = () => {
  return {
    type: ACTION_TYPES.DISMISS_DIALOG_SCREEN
  };
};

export const removeDialogScreen = () => {
  return {
    type: ACTION_TYPES.REMOVE_DIALOG_SCREEN
  };
};

export default ACTION_TYPES;