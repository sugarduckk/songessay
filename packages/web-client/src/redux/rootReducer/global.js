import ACTION_TYPES from '../actions';

const defaultState = {
  dialogScreens: []
};

const global = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_STATE: {
      if (typeof action.state === "function") {
        return {
          ...state,
          ...action.state(state)
        };
      }
      return {
        ...state,
        ...action.state
      };
    }
    case ACTION_TYPES.SET_DIALOG_SCREEN: {
      let dialog = {
        render: action.render,
        show: true
      };
      let temp = [...state.dialogScreens, dialog];
      return {
        ...state,
        dialogScreens: temp
      };
    }
    case ACTION_TYPES.DISMISS_DIALOG_SCREEN: {
      let temp = [...state.dialogScreens];
      temp[0].show = false;
      return {
        ...state,
        dialogScreens: temp
      };
    }
    case ACTION_TYPES.REMOVE_DIALOG_SCREEN: {
      let temp = [...state.dialogScreens];
      temp.splice(0, 1);
      return {
        ...state,
        dialogScreens: temp
      };
    }
    default: {
      return state;
    }
  }
};

export default global;