import * as Actions from "../../actions";


const defaultState = {
  items: [
    {
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ticketType: 0,
      quantity: 0,
    }

  ]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.ADD_ITEM:
      // checken of item al in state zit
      // zo ja: updaten
      // zo nee: toevoegen (quantity + 1)
      let item = state.items.find( i => i.eventId === action.eventId && i.ticketType === action.ticketType );
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

    default:
      return {
        ...state,
      };
  }
};
