import * as Actions from '../actions';

const defaultState = {
  left: {
    open: false,
    type: "",
  },
  right: {
    open: false,
    type: "",
  },
  top: {
    open: false,
    type: "",
  },
  bottom: {
    open: false,
    type: "",
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.OPEN_DRAWER:
      return {
        ...state,
        [action.drawer]: {
          open: true,
          type: action.drawerType,
        },
      }
    case Actions.CLOSE_DRAWER:
      return {
        ...state,
        [action.drawer]: {
          open: false
        },
      }
    case Actions.CLOSE_ALL_DRAWERS:
      return {
        ...defaultState,
      }
    default:
      return {
        ...state
      }
  }
}
