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
  const [filteredEvents, setFilteredEvents] = useState([])

  useEffect(() => {
    const selectedEvents = address ? events.filter(event => event.asset.eventData.ownerId === address) : events;
    const searchedEvents = props.search ? searchByText(selectedEvents, props.search, ['artist', 'title']) : selectedEvents;
    setFilteredEvents(props.tab ? searchedEvents.filter(event => {
      console.log(props.tab, searchedEvents);
      if (props.tab === "eventList02" && event.asset.eventData.status === statuses.SOLD_OUT) {
        return true;
      } else if (props.tab === "eventList01" && ( event.asset.eventData.status  === statuses.UPCOMING ||  event.asset.eventData.status === statuses.OPEN_FOR_SALE)) {
        return true;
      }
      return false;
    }) : searchedEvents);
  console.log("upcoming:", props.filter);
    }, [events, address, props.filter, props.search, props.tab])

  return <div className="p-6">
    <div>

      {filteredEvents && filteredEvents.map(event => {
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
