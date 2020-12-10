export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EMPTY_BASKET = 'EMPTY_BASKET';
export const CHECKOUT_BASKET = 'CHECKOUT_BASKET';

export const addItem = (eventId, ticketType, id, value) => ({
  type: ADD_ITEM,
  eventId,
  ticketType,
  id,
  value,
});

export const removeItem = (eventId, ticketType, id = null) => ({
  type: REMOVE_ITEM,
  eventId,
  ticketType,
  id
});

export const checkoutBasket = (path, value) => ({
  type: CHECKOUT_BASKET,
  path,
  value,
});

export const emptyBasket = () => ({
  type: EMPTY_BASKET,
})
