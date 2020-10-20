import * as Actions from "../../actions";
import _ from "lodash";


const defaultState = {

  items: [
    {
      ticketAddress: "12312341r555ff",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 1,
      quantity: 2,
    },
    {
      ticketAddress: "12dfasdf312341r555ff",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
    },
    {
      ticketAddress: "12dfasdfddf312341r555ff",
      eventId: 'event02',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
    },
    {
      ticketAddress: "12dfasdddsfddf312341r555ff",
      eventId: 'event02',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
    },
    {
      ticketAddress: "12dfasdddcsfddf312341r555ff",
      eventId: 'event02',
      ownerId: 'account02',
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
