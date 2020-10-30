import * as Actions from "../../actions";
import _ from "lodash";

// DE BASKET IS JE WINKELMAND, MET TICKETS, TIJDELIJK OPGESLAGEN
// - link naar een evenement
// - ticket & ticket type

// DEZE TICKETS HALEN WE UIT DE EVENT REDUCER

const defaultState = {

  items: [
    {
      basketId: "basket01",
      ticketAddress: "unknown",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 1,
      quantity: 3,
      price: 90,
    },
    {
      basketId: "basket02",
      ticketAddress: "unknown",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
      price: 45,
    },
    {
      basketId: "basket03",
      ticketAddress: "unknown",
      eventId: 'event02',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
      price: 70,
    },
    {
      basketId: "basket04",
      ticketAddress: "unknown",
      eventId: 'event02',
      ownerId: 'account02',
      ticketType: 2,
      quantity: 2,
      price: 70,
    },
  ]
};

export default (state = defaultState, action) => {
  let item = null;

  switch (action.type) {
    case Actions.ADD_ITEM:
      // checken of item al in state zit
      // zo ja: updaten
      // zo nee: toevoegen (quantity + 1)
      item = state.items.find( i => i.eventId === action.eventId && i.ticketType === action.ticketType );
      if(item){
        item.quantity++;
      } else {
        item = {
          eventId: action.eventId,
          ticketType: action.ticketType,
          quantity: 1,
        }
      }
      return {
        ...state,
        items: [
          ...state.items.filter( i => i.eventId !== action.eventId && i.ticketType !== action.ticketType ),
          item
        ]
      }
    case Actions.REMOVE_ITEM:
      // checkn of item al in state zit
      // zo ja, updaten
      // zo nee: return state
      item = state.items.find( i => i.eventId === action.eventId && i.ticketType === action.ticketType );

      if (item.quantity >= 1){
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
          ...state.items.filter( i => i.eventId !== action.eventId && i.ticketType !== action.ticketType),
          item
        ]
      }
    case Actions.CHECKOUT_BASKET:
      return {
        ...state,
        fillBasket:
          _.set(state.fillBasket, action.path, action.value),

        // key & value meegeven
        // key: title & value: title meegegeven
      };
    default:
      return {
        ...state,
      };
  }
};
