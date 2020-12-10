import * as Actions from "../../actions";

const defaultState = {

  items: []
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case Actions.LOAD_MARKET:
      return {
        ...state,
        items: action.market,
      }
    default:
      return {
        ...state,
      };
  }
};
