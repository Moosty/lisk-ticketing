import * as Actions from "../../actions";

const defaultState = {
  blocks: []
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case Actions.ADD_BLOCK:
      return {
        ...state,
        blocks: [
          ...state.blocks,
          action.block,
        ]
      };
    default:
      return {
        ...state,
      };
  }
};
