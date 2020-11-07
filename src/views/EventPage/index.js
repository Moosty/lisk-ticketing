import React, { useState } from "react";
import {CartBottom, EventHeader, TicketAccordion, TicketType, TopBar} from "components/index";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const EventPage = withReducer("EventPage", reducer)((props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const swapTickets = useSelector(({blockchain}) => blockchain.marketplace.items);

  const {address} = useParams();
  const thisEvent = events.find(event => event.address === address);
  const swapTicketsX = swapTickets.filter(event => event.eventId === address);
  const [search, setSearch] = useState("");

  return <div className="">
    <TopBar/>
    <EventHeader
      className="mt-10"
      search={value => setSearch(value)}
      key={thisEvent.address}
      eventId={thisEvent.address}
      artist={thisEvent.asset.eventData.artist}
      location={thisEvent.asset.eventData.location}
      eventDate={thisEvent.asset.eventData.eventDate}
      startEvent={thisEvent.asset.eventData.eventTime}
      title={thisEvent.asset.eventData.title}
      type="event"
    />
    {thisEvent.asset.ticketData.types.map((type) =>
      <TicketType
        key={type.id}
        label={type.name}
        price={type.price}
        amount={type.amount}
        eventId={thisEvent.address}
        ticketType={type.id}
      />)}
    <TicketAccordion/>
    <CartBottom />
  </div>;
});
