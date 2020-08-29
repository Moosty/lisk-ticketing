import * as Actions from '../actions';

const defaultState = {
  open: false,
  type: null,
  newsletter: {
    submitted: false,
    shown: null,
    timeout: 50000,
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return {
        ...state,
        open: true,
        type: action.modalType,
      }
    case Actions.CLOSE_MODAL:
      return {
        ...state,
        open: false,
        type: null,
      }
    case Actions.SET_NEWSLETTER_SHOWN:
      return {
        ...state,
        newsletter: {
          ...state.newsletter,
          shown: action.timestamp,
        }
      }
    case Actions.SET_NEWSLETTER_SUBMITTED:
      return {
        ...state,
        newsletter: {
          ...state.newsletter,
          submitted: true,
        }
      }
    case Actions.INIT_NEWSLETTER:
      return {
        ...state,
        newsletter: {
          ...defaultState.newsletter,
        }
      }
    default:
      return {
        ...state
      }
  }
}
