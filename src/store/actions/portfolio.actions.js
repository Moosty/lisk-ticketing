export const ADD_PORTFOLIO = 'ADD_PORTFOLIO';
export const LOAD_PORTFOLIO = 'LOAD_PORTFOLIO';

export const addPortfolioTicket = ticket => ({
  type: ADD_PORTFOLIO,
  ticket
});

export const loadPortfolioTicket = tickets => ({
  type: LOAD_PORTFOLIO,
  tickets
});
