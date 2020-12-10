import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../index";
import * as Actions from "store/actions";

export const useEvent = id => {
  const dispatch = useDispatch();
  const { events } = useSelector(({blockchain}) => blockchain.event);
  const [event, setEvent] = useState(null);

  const loadEvents = async () => {
    const eventsData = await API.fetchAllEvents();
    eventsData.map(e => {
      dispatch(Actions.addEvent(e));
    });
  }

  useEffect(() => {
    if (events && events.length === 0) {
      loadEvents();
    }
  }, []);

  useEffect(() => {
    if (id && events?.length > 0) {
      setEvent(events.find(e => e.id === id));
    }
  }, [events, id]);

  return {event, events, loadEvents};
}
