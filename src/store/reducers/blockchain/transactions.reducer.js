import * as Actions from "../../actions";

const defaultState = {
  txs: []
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case Actions.ADD_TX:
      return {
        ...state,
        txs: [
          ...state.txs,
          action.tx,
        ]
      };
    default:
      return {
        ...state,
      };
  }
};
