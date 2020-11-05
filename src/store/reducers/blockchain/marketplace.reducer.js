import * as Actions from "../../actions";
import _ from "lodash";


const defaultState = {

  items: [
    {
      ticketAddress: "12312341r555ff111",
      eventId: 'event01',
      ticketTypeId: 1,
      quantity: 1,
      resellerPrice: 61,
    },
    {
      ticketAddress: "12312341r555ff222",
      eventId: 'event01',
      ticketTypeId: 2,
      quantity: 1,
      resellerPrice: 70,
    },
    {
      ticketAddress: "12312341r555ff23",
      eventId: 'event01',
      ticketTypeId: 2,
      quantity: 1,
      resellerPrice: 72,
    },
    {
      ticketAddress: "12312341r555fdff23",
      eventId: 'event02',
      ticketTypeId: 2,
      quantity: 1,
      resellerPrice: 67,
    },
    {
      ticketAddress: "12312341r55vvv5ff23",
      eventId: 'event02',
      ticketTypeId: 1,
      quantity: 1,
      resellerPrice: 60,
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
