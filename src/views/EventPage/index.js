import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { CartBottom, EventHeader, TicketAccordion, TicketType } from "components/index";
import withReducer from "store/withReducer";
import reducer from "store/reducers";
import { useEvent } from "utils/hooks/event";
import { useOrganizer } from "utils/hooks";

export const EventPage = withReducer("EventPage", reducer)(() => {
  const swapTickets = useSelector(({blockchain}) => blockchain.marketplace.items);
  const {address} = useParams();
  const { isOrganizer } = useOrganizer();
  const {event} = useEvent(address);
  const [search, setSearch] = useState("");

  return <div className="">
    {event && <EventHeader
      className="mt-10"
      search={value => setSearch(value)}
      key={`event-${event.id}`}
      eventId={event.id}
      artist={event.eventData.artist}
      location={event.eventData.location}
      eventDate={event.eventData.eventDate}
      startEvent={event.eventData.eventTime}
      title={event.eventData.title}
      type="event"
      timestamp={event.eventData.date}
      status={event.eventData.status}
    />}
    <div className="py-4">
    {event?.ticketData?.map((type) =>
      <TicketType
        key={type.id}
        label={type.name}
        price={type.price}
        amount={type.amount}
        eventId={event.id}
        ticketType={type.id}
      />)}
    </div>
    <TicketAccordion/>
    {!isOrganizer && <CartBottom/>}
  </div>;
});
