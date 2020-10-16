import * as Actions from "../../actions";
import _ from 'lodash';

// VISITOR ACCOUNTS

const defaultState = {
  createOrganiser: {

  },


  organiserAccounts: [
    {
      address: "1234342432dd",
      publicKey: "lsk1234512f5hgu5hguhu",
      balance: 145,
      token: "lsk",
      asset: {
        organisation: "SanMan",
        firstName: "Sander",
        lastName: "Mandemaker",
        password: "",
      },
    },

  ]
};

export default (state = defaultState, action) => {

  switch (action.type) {

    case Actions.UPDATE_CREATE_ORGANISER:
      return {
        ...state,
        createOrganiser:
          _.set(state.createOrganiser, action.path, action.value),

        // key & value meegeven
        // key: title & value: title meegegeven
      };
    case Actions.ADD_ORGANISER:
      return {
        ...state,
        organiserAccounts:[
          ...state.organiserAccounts,
          action.addOrganiser,
        ],
        // in de array van events, een event appenden (push?)
      };
    default:
      return {
        ...state,
      };
  }
};
