export const UPDATE_CREATE_ACCOUNT = 'UPDATE_CREATE_ACCOUNT';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';

export const updateCreateAccount = (path, value) => ({
  type: UPDATE_CREATE_ACCOUNT,
  path,
  value,
});


export const addAccount = (addAccount) => ({
  type: ADD_ACCOUNT,
  addAccount,
});