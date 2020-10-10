import * as Actions from "../../actions";
import _ from 'lodash';

// object
// key
// value

export const statuses = {
  "UPCOMING": "UPCOMING",
  "OPEN_FOR_SALE": "OPEN_FOR_SALE",
  "SOLD_OUT": "SOLD_OUT",
  "CANCELLED": "CANCELLED",
};


const defaultState = {
  createEvent: {
    asset: {
      eventData: {
        title: "The Favourites",
        artist: "Racoon",
        location: "Caprera Openluchttheater - Bloemendaal",
        startEvent: new Date(),
      },

    },
    },


  events: [
    {
      address: "asdffqwerkqjewrflqkwejfL",
      publicKey: "lsk1234134tgerafgvasdfx9325fgcd",
      asset: {
        eventData: {
          status: statuses.OPEN_FOR_SALE,
          title: "title",
          artist: "Racoon",
          location: "Caprera Openluchttheater - Bloemendaal",
          startEvent: new Date(),
          endEvent: "end time event",
          category: "test category",
          site: "https://lisk.io/apps/",
          image: "event image",
        },
        ticketData: {
          startSell: "date start selling",
          endSell: "standard event date",
          types: [
            {
              id: 0,
              name: "First Release Ticket",
              price: 45.26,
              amount: 10,
              sold: 0,
            },
            {
              id: 1,
              name: "Second Release Ticket",
              price: 55.26,
              amount: 20,
              sold: 0,
            },
            {
              id: 2,
              name: "Third Release Ticket",
              price: 75.26,
              amount: 20,
              sold: 0,
            },
          ],
        },
        resellData: {
          resell: true,
          maximumResellPercentage: 120,
        },
      },
    },
    {
      address: "Address",
      publicKey: "pubKey",
      asset: {
        eventData: {
          status: statuses.OPEN_FOR_SALE,
          title: "title",
          artist: "Artist",
          location: "location",
          startEvent: new Date(),
          endEvent: "end time event",
          category: "test category",
          site: "https://lisk.io/apps/",
          image: "event image",
        },
        ticketData: {
          startSell: "date start selling",
          endSell: "standard event date",
          types: [
            {
              id: 0,
              name: "First Release Ticket",
              price: 45.26,
              amount: 10,
              sold: 0,
            },
            {
              id: 1,
              name: "Second Release Ticket",
              price: 55.26,
              amount: 20,
              sold: 0,
            },
            {
              id: 2,
              name: "Third Release Ticket",
              price: 75.26,
              amount: 20,
              sold: 0,
            },
          ],
        },
        resellData: {
          resell: true,
          maximumResellPercentage: 120,
          // in percentage
          resellOrganiserFee: 1,
        },
      },
    },
  ]
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
      return {
        ...state,
        events:[
          ...state.events,
          action.addEvent,
        ],
        // in de array van events, een event appenden (push?)
      };
    default:
      return {
        ...state,
      };
  }
};
