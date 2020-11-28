/* global BigInt */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../index";
import * as Actions from "store/actions";

export const useBasket = () => {
  const dispatch = useDispatch();
  const { events } = useSelector(({blockchain}) => blockchain.event);
  const { items } = useSelector(({blockchain}) => blockchain.basket);
  const [total, setTotal] = useState();
  const [ticketCount, setTicketTotal] = useState();

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await API.fetchAllEvents();
      eventsData.map(e => {
        dispatch(Actions.addEvent(e));
      });
    }
    if (events && events.length === 0) {
      loadEvents();
    }
  }, []);

  useEffect(() => {
    let runningTotal = BigInt(0);
    let runningTicketCount = 0;
    items.map(i => {
      const event = events.find(e => e.id === i.eventId);
      if (!i.value && event) {
        const type = event.ticketData.find(t => t.id === i.ticketType);
        if (type) {
          const subTotal = BigInt(type.price) * BigInt(i.quantity);
          runningTicketCount += i.quantity;
          runningTotal += subTotal;
        }
      } else {
        runningTicketCount++;
        runningTotal += BigInt(i.value);
      }
    });
    setTotal(runningTotal);
    setTicketTotal(runningTicketCount);
  }, [items]);

  return {total, ticketCount, items};
}
