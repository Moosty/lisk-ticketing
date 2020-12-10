import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../index";
import * as Actions from "store/actions";

export const useTickets = id => {
  const dispatch = useDispatch();
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const {tickets} = useSelector(({blockchain}) => blockchain.portfolio);
  const [myTickets, setMyTickets] = useState([]);
  const [myTicket, setMyTicket] = useState(null);

  const loadTickets = async () => {
    const ticketsData = await API.fetchAllTickets();
    ticketsData.map(e => {
      dispatch(Actions.addPortfolioTicket(e));
    });
  }

  useEffect(() => {
    if (id && tickets?.length > 0) {
      setMyTicket(tickets.find(t => t.id === id));
    }
  }, [tickets, id]);

  useEffect(() => {
    if (account?.passphrase && tickets?.length > 0) {
      setMyTickets(tickets.filter(t => t.ownerAddress === account.address));
    }
  }, [tickets]);

  useEffect(() => {
    if (tickets && tickets.length === 0) {
      loadTickets();
    }
  }, []);

  return {tickets, myTickets, myTicket, loadTickets};
}
