import * as Actions from "../../actions";
import _ from "lodash";

export const ticketStatuses = {
  "OWNED": "OWNED",
  "SELLING": "SELLING",
  "PAST_EVENT": "PAST_EVENT",
};


const defaultState = {

  items: [
    {
      ticketAddress: "12312341r555ff",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 1,
      quantity: 2,
      ticketStatus: ticketStatuses.OWNED,
    },
    {
      ticketAddress: "12dfasdf312341r555ff",
      eventId: 'event01',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
      ticketStatus: ticketStatuses.OWNED,
    },
    {
      ticketAddress: "12dfasdfddf312341r555ff",
      eventId: 'event02',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
      ticketStatus: ticketStatuses.OWNED,
    },
    {
      ticketAddress: "12dfasdddsfddf312341r555ff",
      eventId: 'event02',
      ownerId: 'account01',
      ticketType: 2,
      quantity: 2,
      ticketStatus: ticketStatuses.SELLING,
    },
    {
      ticketAddress: "12dfasdddcsfddf312341r555ff",
      eventId: 'event02',
      ownerId: 'account02',
      ticketType: 2,
      quantity: 2,
      ticketStatus: ticketStatuses.PAST_EVENT,
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
