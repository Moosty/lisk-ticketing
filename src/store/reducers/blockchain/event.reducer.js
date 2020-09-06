import * as Actions from "../../actions";

export const statuses = {
  "UPCOMING": "UPCOMING",
  "OPEN_FOR_SALE": "OPEN_FOR_SALE",
  "SOLD_OUT": "SOLD_OUT",
  "CANCELLED": "CANCELLED",
};

const defaultState = {
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
            },
            {
              id: 1,
              name: "Second Release Ticket",
              price: 55.26,
              amount: 20,
            },
            {
              id: 1,
              name: "Third Release Ticket",
              price: 75.26,
              amount: 20,
            },
          ],
        },
        resellData: {
          resell: true,
          maximumResellPercentage: 120,
        },
      },
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
