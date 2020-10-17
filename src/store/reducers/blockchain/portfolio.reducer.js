import * as Actions from "../../actions";
import _ from "lodash";


const defaultState = {

  items: [
    {
      ticketAddress: "12312341r555ff",
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ownerId: '1234342432dd',
      ticketType: 1,
      quantity: 2,
    },
    {
      ticketAddress: "12dfasdf312341r555ff",
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ownerId: '1234342432dd',
      ticketType: 2,
      quantity: 2,
    },
    {
      ticketAddress: "12dfasdfddf312341r555ff",
      eventId: '89348502934850928345098',
      ownerId: '1234342432dd',
      ticketType: 2,
      quantity: 2,
    },
  ]
};

export default (state = defaultState, action) => {

  switch (action.type) {

    default:
      return {
        ...state,
      };
  }
};
