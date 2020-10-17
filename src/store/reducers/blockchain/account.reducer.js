import * as Actions from "../../actions";
import _ from 'lodash';

// VISITOR ACCOUNTS

const defaultState = {
  createAccount:  {
    address: "1234342432ddddfd",
    publicKey: "lsk1234512f5hgu5hguhu",
    balance: 145,
    token: "lsk",
    asset: {
      username: "test",
      firstName: "test",
      lastName: "test",
      password: "",
    },
  },


  accounts: [
    {
      address: "1234342432dd",
      publicKey: "lsk1234512f5hgu5hguhu",
      balance: 145,
      token: "lsk",
      asset: {
        username: "SanMan",
        firstName: "Sander",
        lastName: "Mandemaker",
        password: "",
      },
    },
    {
      address: "sadfasdfsdfa",
      publicKey: "lsk1234512f5hgu5hguhu",
      balance: 150,
      token: "lsk",
      asset: {
        username: "Raph",
        firstName: "Raph",
        lastName: "Cornelis",
        password: "",
      },
    },
  ]
};

export default (state = defaultState, action) => {

  switch (action.type) {

    case Actions.UPDATE_CREATE_ACCOUNT:
      return {
        ...state,
        createAccount:
          _.set(state.createAccount, action.path, action.value),

        // key & value meegeven
        // key: title & value: title meegegeven
      };
    case Actions.ADD_ACCOUNT:
      console.log(state.accounts);
      return {
        ...state,
        accounts:[
          ...state.accounts,
          action.addAccount,
        ],
        // in de array van events, een event appenden (push?)
      };

    default:
      return {
        ...state,
      };
  }
};
