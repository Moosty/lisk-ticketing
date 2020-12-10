export const UPDATE_CREATE_ORGANISER = 'UPDATE_CREATE_ORGANISER';
export const ADD_ORGANISER = 'ADD_ORGANISER';
export const ADD_ORGANIZER = 'ADD_ORGANIZER';
export const LOAD_ORGANIZERS = 'LOAD_ORGANIZERS';

export const updateCreateOrganiser = (path, value) => ({
  type: UPDATE_CREATE_ORGANISER,
  path,
  value,
});

export const addOrganiser = (addOrganiser) => ({
  type: ADD_ORGANISER,
  addOrganiser,
});

export const loadOrganizers = organizers => ({
  type: LOAD_ORGANIZERS,
  organizers,
});

export const addOrganizer = organizer => ({
  type: ADD_ORGANIZER,
  organizer,
});
