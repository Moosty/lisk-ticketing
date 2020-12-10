import * as Actions from "../../actions";

const defaultState = {
  createAccount: {
    username: "",
    password: "",
  },
  account: {},
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
        createAccount: {
          ...state.createAccount,
          [action.path]: action.value
        }
      };
    case Actions.SET_ACCOUNT:
      return {
        ...state,
        account: action.account,
      }
    case Actions.SIGNOUT:
      return {
        ...state,
        account: {},
      }
    case Actions.ADD_ACCOUNT:
      return {
        ...state,
        accounts: [
          ...state.accounts,
          action.addAccount,
        ],
      };
    default:
      return {
        ...state,
      };
  }
};
