export const UPDATE_CREATE_EVENT = 'UPDATE_CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const ADD_EVENT = 'ADD_EVENT';

export const updateCreateEvent = (update) => ({
  type: UPDATE_CREATE_EVENT,
  update,
});

export const addEvent = (addEvent) => ({
  type: ADD_EVENT,
  addEvent,
});

export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId
});