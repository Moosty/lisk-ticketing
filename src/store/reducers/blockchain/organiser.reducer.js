import * as Actions from "../../actions";
import _ from 'lodash';

// VISITOR ACCOUNTS

const defaultState = {
  createOrganiser:  {
    address: "organiser03",
    publicKey: "lsk1234512f5hgu5hguhfggu",
    balance: 350,
    token: "lsk",
    asset: {
      organisation: "Newbies",
      firstName: "To",
      lastName: "de Max",
      password: "",
    },
  },
  organizers: [],
  organiserAccounts: [
    {
      address: "organiser01",
      publicKey: "lsk1234512f5hgu5hguhu",
      balance: 145,
      token: "lsk",
      asset: {
        organisation: "Tivoli",
        firstName: "admin",
        lastName: "admin",
        password: "",
      },
    },
    {
      address: "organiser02",
      publicKey: "lsk123451df2f5hgu5hguhu",
      balance: 350,
      token: "lsk",
      asset: {
        organisation: "Paradiso Amsterdam",
        firstName: "Henk",
        lastName: "de Lead",
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
    case Actions.ADD_ORGANIZER:
      return {
        ...state,
        organizers: [
          ...state.organizers,
          action.organizer,
        ]
      }
    case Actions.LOAD_ORGANIZERS:
      return {
        ...state,
        organizers: action.organizers,
      }
    default:
      return {
        ...state,
      };
  }
};
