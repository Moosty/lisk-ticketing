export const UPDATE_CREATE_EVENT = 'UPDATE_CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const LOAD_EVENTS = 'LOAD_EVENTS';

export const updateCreateEvent = (path, value) => ({
  type: UPDATE_CREATE_EVENT,
  path,
  value,
});

export const addEvent = event => ({
  type: ADD_EVENT,
  event,
});
export const loadEvents = events => ({
  type: LOAD_EVENTS,
  events,
});

export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId
});
