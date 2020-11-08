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
      ticketAddress: "12312341r555ff23",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 1,
      quantity: 1,
    },
    {
      basketId: "basket02",
      ticketAddress: "unknown02",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 1,
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
      console.log("1) ITEM VOOR AANVULLEN", item);
      if(item){
        item.quantity++;
      } else {
        item = {
          eventId: action.eventId,
          ticketType: action.ticketType,
          quantity: 1,
        }
      }
      // console.log("1a", state.items);
      // console.log("2)  FILTER", state.items.filter( i => i.eventId !== action.eventId && i.ticketType !== action.ticketType )
      // );
      // console.log("3) ITEM NA FILTER", item);

      return {
        ...state,
        items: [
          ...state.items.filter( i => i.eventId !== action.eventId || (i.eventId === action.eventId && i.ticketType !== action.ticketType)),
          item
        ]
      }
    case Actions.REMOVE_ITEM:
      // checkn of item al in state zit
      // zo ja, updaten
      // zo nee: return state
      item = state.items.find( i => i.eventId === action.eventId && i.ticketType === action.ticketType );

      if (item && item.quantity >= 1){
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
