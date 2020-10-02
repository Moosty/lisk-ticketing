export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EMPTY_BASKET = 'EMPTY_BASKET';

export const addItem = (eventId, ticketType) => ({
  type: ADD_ITEM,
  eventId,
  ticketType,
});

export const removeItem = (eventId, ticketType) => ({
  type: REMOVE_ITEM,
  eventId,
  ticketType,
});