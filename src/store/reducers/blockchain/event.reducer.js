import * as Actions from "../../actions";
import _ from 'lodash';

// object
// key
// value

// DE EVENT REDUCER BEVAT ALLE DATA VAN EEN EVENT

export const statuses = {
  "NEW": 0,
  "UPCOMING": 1,
  "OPEN_FOR_SALE": 2,
  "SOLD_OUT": 3,
  "CANCELLED": 4,
  "DONE": 5,
};


const defaultState = {
  createEvent: {
    address: "event04",
    publicKey: "lsk1234134tgerafgvasdfx9325fgcd",
    asset: {
      eventData: {
        title: "The Favourites of the new era",
        location: "Caprera Openluchttheater - Bloemendaal",
        eventDate: "",
        eventTime: "",
        duration: 90,
        category: "test category",
        site: "https://lisk.io/apps/",
        image: "event image",
      },
      ticketData: {
        types: [
          {
            startSellDate: new Date(),
            startSellTime: 900,
            id: 0,
            name: "First Release Ticket",
            price: 45.26,
            amount: 10,
            sold: 0,
          },
        ],
      },
      resellData: {
        allowed: true,
        maximumResellPercentage: 120,
        resellOrganiserFee: 1, //in percentage
      },
    },
  },
  events: [],
};

export default (state = defaultState, action) => {

  switch (action.type) {

    case Actions.UPDATE_CREATE_EVENT:
      return {
        ...state,
        createEvent:
          _.set(state.createEvent, action.path, action.value),

        // key & value meegeven
        // key: title & value: title meegegeven
      };
    case Actions.ADD_EVENT:
      const events = [];

      [...state.events, action.event].map(e => events.findIndex(ei => ei.id === e.id) === -1 ? events.push(e) : false);
      return {
        ...state,
        events
        // in de array van events, een event appenden (push?)
      };
    case Actions.LOAD_EVENTS:
      return {
        ...state,
        events: action.events
      };
    default:
      return {
        ...state,
      };
  }
};
