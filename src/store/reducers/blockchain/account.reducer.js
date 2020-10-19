import * as Actions from "../../actions";
import _ from 'lodash';

// VISITOR ACCOUNTS

const defaultState = {
  createAccount:  {
    address: "account03",
    publicKey: "lsk1234512f5hgu5hguhu",
    balance: 145,
    token: "lsk",
    asset: {
      username: "test",
      password: "",
    },
  },


  accounts: [
    {
      address: "account01",
      publicKey: "lsk1234512f5hgu5hguhu",
      balance: 145,
      token: "lsk",
      asset: {
        username: "Sander Mandemaker",
        password: "",
      },
    },
    {
      address: "account02",
      publicKey: "lsk1234512f5hgu5hguhu",
      balance: 150,
      token: "lsk",
      asset: {
        username: "Raphael Cornelis",
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
