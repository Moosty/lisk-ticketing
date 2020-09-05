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
      assets: {
        eventData: {
          status: statuses.OPEN_FOR_SALE,
          title: "title",
          artist: "artist",
          location: "location",
          startEvent: new Date(),
          endEvent: "end time event",
          category: "test category",
          site: "event site",
          image: "event image",
        },
        ticketData: {
          startSell: "date start selling",
          endSell: "standard event date",
          types: [
            {
              id: 0,
              name: "name ticket",
              price: 30,
              amount: 10,
            },
            {
              id: 1,
              name: "name ticket2",
              price: 50,
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
