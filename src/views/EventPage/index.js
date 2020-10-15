import React, {useEffect} from "react";
import {Header} from "components/Header";
import {TicketAccordion, Event, CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom';

export const EventPage = withReducer("EventPage", reducer)((props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);
  const swapTickets = useSelector(({blockchain}) => blockchain.marketplace.items);

  const {address} = useParams();
  const eventX = events.find(event => event.address === address);
  const swapTicketsX = swapTickets.filter(event => event.eventId === address);

  useEffect(() => {
  
  }, [events, swapTickets]);

  return <div className="mt-10">

    <EventHeader
      key={eventX.address}
      artist={eventX.asset.eventData.artist}
      location={eventX.asset.eventData.location}
      eventDate={eventX.asset.eventData.eventDate}
      startEvent={eventX.asset.eventData.eventTime}
    />

    {eventX.asset.ticketData.types.map((type) =>
      <TicketType

        key={type.id}
        label={type.name}
        price={type.price}
        amount={type.amount}
        eventId={eventX.address}
        ticketType={type.id}
      />)}

      <TicketAccordion
      />


    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});
