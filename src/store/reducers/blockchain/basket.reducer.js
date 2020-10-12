import * as Actions from "../../actions";
import _ from "lodash";


const defaultState = {
  fillBasket: {

  },
  items: [
    {
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ticketType: 1,
      quantity: 2,
    },

  ]
};

export default (state = defaultState, action) => {
  let item = null;
  console.log(item);

  switch (action.type) {
    case Actions.ADD_ITEM:
      // checken of item al in state zit
      // zo ja: updaten
      // zo nee: toevoegen (quantity + 1)
      item = state.items.find( i => i.eventId === action.eventId && i.ticketType === action.ticketType );
      if(item){
        console.log(item)
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
      console.log(state.items);

      if (item.quantity > 1){
        console.log(item)
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
