import * as Actions from "store/actions";

export const ticketStatuses = {
  "OWNED": 0,
  "MARKET": 2,
  "PAST_EVENT": 3,
  "CANCELED": 3,
  "SCANNED": 1,
};

// TODO wat moeten we met QUANTITY? volgens mij is elk ticketaccount uiteindelijk 1 ticket?

const defaultState = {
  tickets: [],
};

export default (state = defaultState, action) => {

  switch (action.type) {
    case Actions.ADD_PORTFOLIO:
      return {
        ...state,
        tickets: [
          ...state.tickets,
          action.ticket
        ].filter((value, index, self) => self.findIndex(a => a.id === value.id) === index),
      }
    case Actions.LOAD_PORTFOLIO:
      return {
        ...state,
        tickets: action.tickets
      }
    default:
      return {
        ...state,
      };
  }
};
