import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTickets } from "./index";
import { API } from "../index";
import * as Actions from "store/actions";

export const useMarket = event => {
  const dispatch = useDispatch();
  const {items} = useSelector(({blockchain}) => blockchain.market);
  const {tickets} = useTickets();
  const [marketTickets, setMarketTickets] = useState([]);
  const [marketSelected, setMarketSelected] = useState([]);

  const loadMarket = async () => {
    const marketData = await API.fetchAllMarketTickets();
    dispatch(Actions.loadMarket(marketData));
  }

  useEffect(() => {
    if (items && items.length === 0) {
      loadMarket();
    }
  }, []);

  useEffect(() => {
    if (tickets?.length > 0 && items?.length > 0) {
      setMarketTickets(items.map(i => ({
        ...tickets.find(t => t.id === i.ticketId),
        market: i.id,
        value: i.price,
      })));
    }
  }, [tickets, items]);

  useEffect(() => {
    if (event && marketTickets?.length > 0) {
      setMarketSelected(marketTickets.filter(mt => mt.eventId === event.id));
    }
  }, [marketTickets, event]);

  return {marketTickets, marketSelected};
}
