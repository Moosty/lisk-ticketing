import * as Actions from "../../actions";
import _ from "lodash";


const defaultState = {

  items: [
    {
      ticketAddress: "12312341r555ff111",
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ticketTypeId: 1,
      quantity: 1,
      resellerPrice: 125,
    },
    {
      ticketAddress: "12312341r555ff222",
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ticketTypeId: 2,
      quantity: 1,
      resellerPrice: 125,
    },
    {
      ticketAddress: "12312341r555ff23",
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ticketTypeId: 2,
      quantity: 1,
      resellerPrice: 125,
    },
    {
      ticketAddress: "12312341r555ff23",
      eventId: '89348502934850928345098',
      ticketTypeId: 2,
      quantity: 1,
      resellerPrice: 125,
    },
    {
      ticketAddress: "12312341r555ff23",
      eventId: '89348502934850928345098',
      ticketTypeId: 1,
      quantity: 1,
      resellerPrice: 125,
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
