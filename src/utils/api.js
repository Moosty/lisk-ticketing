const sdkApi = "https://api-ticketswap.moosty.com/";
const extendedApi = "https://eapi-ticketswap.moosty.com/";

export const fetchNodeInfo = async () => {
  return fetch(`${sdkApi}api/node/info`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchAccountInfo = async (address) => {
  return fetch(`${sdkApi}api/accounts/${address}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const sendTransactions = async (tx) => {
  return fetch(`${sdkApi}api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tx),
  })
    .then((res) => res.json())
    .then((res) => res);
};

export const fetchTransaction = async id => {
  return fetch(`${sdkApi}api/transactions/${id}`)
    .then((res) => res.json())
    .then((res) => res);
};

export const fetchAllUsernames = async () => {
  return fetch(`${extendedApi}api/usernames`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchAllOrganizers = async () => {
  return fetch(`${extendedApi}api/organizers`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchOrganizer = async id => {
  return fetch(`${extendedApi}api/organizer/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchAllEvents = async () => {
  return fetch(`${extendedApi}api/events`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchEvent = async (id) => {
  return fetch(`${extendedApi}api/event/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchAllTickets = async () => {
  return fetch(`${extendedApi}api/tickets`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchTicket = async (id) => {
  return fetch(`${extendedApi}api/ticket/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchAllMarketTickets = async () => {
  return fetch(`${extendedApi}api/market`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const fetchMarketTicket = async (id) => {
  return fetch(`${extendedApi}api/market/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
};
