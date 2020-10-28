import React, { useEffect, useState } from "react";
import {EventItem, TicketListItem, TicketType} from "components/index";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {EventListItem} from "components/EventListItem";
import { statuses } from "../store/reducers/blockchain/event.reducer";

// TODO - OVERVIEW PAGINA: alle events
// TODO - organisatie pagina: gefilterd

export const EventList = withReducer("TicketList", reducer)((props) => {
  const {address} = useParams();
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const theseEvents = events.filter(event => event.asset.eventData.ownerId === address);
  const [filterdEvents, setFilterdEvents] = useState([])
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    console.log("alle events in ticketlist:", events);
    console.log("deze events", theseEvents);

    const selectedEvents = address ? events.filter(event => event.asset.eventData.ownerId === address) : events;
    setFilterdEvents(filter ? selectedEvents.filter(event => event.asset.eventData.status === filter) : selectedEvents);

  }, [events, address, filter])

  return <div className="p-6">

    <div>
      <ul>
        <li onClick={() => setFilter(filter === statuses.UPCOMING ? null : statuses.UPCOMING)}>Upcoming</li>
        <li onClick={() => setFilter(filter === statuses.OPEN_FOR_SALE ? null : statuses.OPEN_FOR_SALE)}>Sale</li>
        <li onClick={() => setFilter(filter === statuses.SOLD_OUT ? null : statuses.SOLD_OUT)}>Soldout</li>
      </ul>
      {filterdEvents && filterdEvents.map(event => {
        return (
          <EventItem key={event.address}
                     eventId={event.address}
                     eventDate={event.asset.eventData.eventDate}
                     startEvent={event.asset.eventData.eventTime}
                     artist={event.asset?.eventData?.artist}
                     title={event.asset?.eventData?.title}
                     location={event.asset?.eventData?.location}
                     type="overview"
                     status="active"
          />)
      })}
    </div>
  </div>;
});
