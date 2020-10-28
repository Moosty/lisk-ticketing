import React, { useEffect, useState } from "react";
import _ from 'lodash';
import { EventItem } from "components/index";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { statuses } from "../store/reducers/blockchain/event.reducer";

// TODO - OVERVIEW PAGINA: alle events
// TODO - organisatie pagina: gefilterd

const searchByText = (collection, text, fields) => {
  text = _.toLower(text);
  return _.filter(collection, object => {
    for (let field in fields) {
      if (object.asset.eventData[fields[field]].toLowerCase().indexOf(text) > -1) {
        return true;
      }
    }
    return false;
  });
}

export const EventList = withReducer("TicketList", reducer)((props) => {
  const {address} = useParams();
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const [filterdEvents, setFilterdEvents] = useState([])
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    const selectedEvents = address ? events.filter(event => event.asset.eventData.ownerId === address) : events;
    const searchedEvents = props.search ? searchByText(selectedEvents, props.search, ['artist', 'title']) : selectedEvents;
    setFilterdEvents(filter ? searchedEvents.filter(event => event.asset.eventData.status === filter) : searchedEvents);
  }, [events, address, filter, props.search])

  return <div className="p-6">
    <div>
      <ul>
        <li onClick={() => setFilter(filter === statuses.UPCOMING ? null : statuses.UPCOMING)}>Upcoming</li>
        <li onClick={() => setFilter(filter === statuses.OPEN_FOR_SALE ? null : statuses.OPEN_FOR_SALE)}>Sale</li>
        <li onClick={() => setFilter(filter === statuses.SOLD_OUT ? null : statuses.SOLD_OUT)}>Soldout</li>
      </ul>
      {filterdEvents && filterdEvents.map(event => {
        return (
          <EventItem
            key={event.address}
            eventId={event.address}
            eventDate={event.asset.eventData.eventDate}
            startEvent={event.asset.eventData.eventTime}
            artist={event.asset?.eventData?.artist}
            title={event.asset?.eventData?.title}
            location={event.asset?.eventData?.location}
            type="overview"
            status={event.asset.eventData.status}
          />)
      })}
    </div>
  </div>;
});
