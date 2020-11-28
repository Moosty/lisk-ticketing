import * as Actions from "../../actions";
import _ from "lodash";

// DE BASKET IS JE WINKELMAND, MET TICKETS, TIJDELIJK OPGESLAGEN
// - link naar een evenement
// - ticket & ticket type

// DEZE TICKETS HALEN WE UIT DE EVENT REDUCER

const defaultState = {
  items: [],
};

export default (state = defaultState, action) => {
  let item = null;

  switch (action.type) {
    case Actions.ADD_ITEM:
      // checken of item al in state zit
      // zo ja: updaten
      // zo nee: toevoegen (quantity + 1)
      if (action.id) {
        item = {
          id: action.id,
          eventId: action.eventId,
          ticketType: action.ticketType,
          value: action.value,
          quantity: 1,
        }
      } else {
        item = state.items.find(i => i.eventId === action.eventId && i.ticketType === action.ticketType);
        if (item) {
          item.quantity++;
        } else {
          item = {
            eventId: action.eventId,
            ticketType: action.ticketType,
            quantity: 1,
          }
        }
      }

      return {
        ...state,
        items: [
          ...state.items.filter( i => action.id || (i.eventId !== action.eventId || (i.eventId === action.eventId && i.ticketType !== action.ticketType))),
          item
        ]
      }
    case Actions.REMOVE_ITEM:
      // checkn of item al in state zit
      // zo ja, updaten
      // zo nee: return state
      item = state.items.find( i => i.eventId === action.eventId && i.ticketType === action.ticketType );

      if (item?.quantity >= 1){
        item.quantity--;
      } else {
        item = {
          eventId: action.eventId,
          ticketType: action.ticketType,
          quantity: 0,
        }
      }
      return {
        ...state,
        items: [
          ...state.items.filter( i => i.eventId !== action.eventId || (i.eventId === action.eventId && i.ticketType !== action.ticketType)),
          item
        ]
      }
    case Actions.EMPTY_BASKET:
      return {
        items: [],
      }
    default:
      return {
        ...state,
      };
  }
};
