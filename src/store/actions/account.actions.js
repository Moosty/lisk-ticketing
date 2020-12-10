export const UPDATE_CREATE_ACCOUNT = 'UPDATE_CREATE_ACCOUNT';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SIGNOUT = 'SIGNOUT';

export const updateCreateAccount = (path, value) => ({
  type: UPDATE_CREATE_ACCOUNT,
  path,
  value,
});

export const setAccount = account => ({
  type: SET_ACCOUNT,
  account,
});

export const signOut = () => ({
  type: SIGNOUT,
});

export const addAccount = (addAccount) => ({
  type: ADD_ACCOUNT,
  addAccount,
});
