import * as Actions from "../../actions";
import _ from "lodash";


const defaultState = {

  items: [
    {
      ticketAddress: "12312341r555ff",
      eventId: 'asdffqwerkqjewrflqkwejfL',
      ticketType: 1,
      quantity: 2,
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
