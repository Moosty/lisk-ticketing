import React, { useEffect, useState } from "react";
import { EventItem } from "components/index";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { statuses } from "../store/reducers/blockchain/event.reducer";
import { EventSkeleton } from "components/EventSkeleton";
import * as Actions from "store/actions";
import { searchByText, API } from "../utils";



export const EventList = withReducer("TicketList", reducer)(({tab, search, type}) => {
  const dispatch = useDispatch();
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const {events} = useSelector(({blockchain}) => blockchain.event);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await API.fetchAllEvents();
      events.map(e => {
        dispatch(Actions.addEvent(e));
      });
    }
    if (events && events.length === 0) {
      loadEvents();
    }
  }, [events]);

  useEffect(() => {
    let selectedEvents = events;
    if (type === "organizer") {
      selectedEvents = events.filter(e => e.organizationId === account.organizer.organization);
    } else if (type === "overview") {
        selectedEvents = events.filter(e => e.eventData.status < 3);
    }
    const searchedEvents = search ? searchByText(selectedEvents, search, ['title']) : selectedEvents;
    setFilteredEvents(tab ? searchedEvents.filter(event => {
      if (tab === "eventList02" && event.eventData.status >= 3) {
        return true;
      } else if (tab === "eventList01" && (event.eventData.status === statuses.NEW || event.eventData.status === statuses.UPCOMING || event.eventData.status === statuses.OPEN_FOR_SALE)) {
        return true;
      }
      return false;
    }) : searchedEvents);
  }, [events, search, tab, type])

  return <div className="p-6 bg-white">
    {filteredEvents.length > 0 && filteredEvents.map(event =>
      <EventItem
        key={`event-${event.id}`}
        eventId={event.id}
        eventTimestamp={event.eventData.date}
        artist={event.eventData?.artist}
        title={event.eventData?.title}
        location={event.eventData?.location}
        type={type}
        status={event.eventData.status}
      />)}
    {filteredEvents.length === 0 && [0, 0, 0, 0].map(() => <EventSkeleton/>)}
  </div>;
});
