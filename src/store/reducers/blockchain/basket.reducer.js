import * as Actions from "../../actions";


const defaultState = {
  items: [
    {
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ticketType: 1,
      quantity: 2,
    }

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
    default:
      return {
        ...state,
      };
  }
};
