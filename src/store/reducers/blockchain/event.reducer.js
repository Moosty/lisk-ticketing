import * as Actions from "../../actions";
import _ from 'lodash';

// object
// key
// value

// DE EVENT REDUCER BEVAT ALLE DATA VAN EEN EVENT

export const statuses = {
  "NEW": "NEW",
  "UPCOMING": "UPCOMING",
  "OPEN_FOR_SALE": "OPEN_FOR_SALE",
  "SOLD_OUT": "SOLD_OUT",
  "CANCELLED": "CANCELLED",
  "DONE": "DONE",
};


const defaultState = {
  createEvent: {
    address: "addafsdqsdffqwerkqjewrflqkwejfL",
    publicKey: "lsk1234134tgerafgvasdfx9325fgcd",
    asset: {
      eventData: {
        title: "The Favourites",
        artist: "Racoon",
        location: "Caprera Openluchttheater - Bloemendaal",
        eventDate: new Date(),
        eventTime: 900,
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
          {
            startSellDate: new Date(),
            startSellTime: 900,
            id: 1,
            name: "Second Release Ticket",
            price: 55.26,
            amount: 20,
            sold: 0,
          },
          {
            startSellDate: new Date(),
            startSellTime: 900,
            id: 2,
            name: "Third Release Ticket",
            price: 75.26,
            amount: 20,
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


  events: [
    {
      address: "asdffqwerkqjewrflqkwejfL",
      publicKey: "lsk1234134tgerafgvasdfx9325fgcd",
      asset: {
        eventData: {
          status: statuses.OPEN_FOR_SALE,
          title: "titletitletitletitletitletitle",
          artist: "Racoon",
          location: "Caprera Openluchttheater - Bloemendaal",
          eventDate: new Date(),
          eventTime: 900,
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
            {
              startSellDate: new Date(),
              startSellTime: 900,
              id: 1,
              name: "Second Release Ticket",
              price: 55.26,
              amount: 20,
              sold: 0,
            },
            {
              startSellDate: new Date(),
              startSellTime: 900,
              id: 2,
              name: "Third Release Ticket",
              price: 75.26,
              amount: 20,
              sold: 0,
            },
          ],
        },
        resellData: {
          allowed: true,
          maximumResellPercentage: 120,
          resellOrganiserFee: 1, //in percentages
        },
      },
    },
    {
      address: "89348502934850928345098",
      publicKey: "pubKey",
      asset: {
        eventData: {
          status: statuses.OPEN_FOR_SALE,
          title: "title",
          artist: "Artist",
          location: "location",
          eventDate: new Date(),
          eventTime: 900,
          duration: 90,
          category: "test category",
          site: "https://lisk.io/apps/",
          image: "event image",
        },
        ticketData: {
          // Ticket sale starts when the first ticket can be bought
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
            {
              startSellDate: new Date(),
              startSellTime: 900,
              id: 1,
              name: "Second Release Ticket",
              price: 55.26,
              amount: 20,
              sold: 0,
            },
            {
              startSellDate: new Date(),
              startSellTime: 900,
              id: 2,
              name: "Third Release Ticket",
              price: 75.26,
              amount: 20,
              sold: 0,
            },
          ],
        },
        resellData: {
          allowed: true,
          maximumResellPercentage: 120,
          resellOrganiserFee: 1,  // in percentages
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
        events: [
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
