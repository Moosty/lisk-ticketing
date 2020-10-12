export const UPDATE_CREATE_ORGANISER = 'UPDATE_CREATE_ORGANISER';
export const ADD_ORGANISER = 'ADD_ORGANISER';

export const updateCreateOrganiser = (path, value) => ({
  type: UPDATE_CREATE_ORGANISER,
  path,
  value,
});


export const addOrganiser = (addOrganiser) => ({
  type: ADD_ORGANISER,
  addOrganiser,
});