export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export const createEvent = (eventId) => ({
  type: CREATE_EVENT,
  eventId,
});


export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId
});