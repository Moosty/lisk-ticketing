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
  const {address} = useParams();
  const eventX = events.find(event => event.address === address);

  useEffect(() => {
    console.log(events);
    console.log(eventX);
  }, [events]);

  return <div className="mt-10">

    {/* TODO TIJDELIJK BEGIN*/}
    <EventHeader
      key={eventX.address}
      artist={eventX.asset.eventData.artist}
      location={eventX.asset.eventData.location}
      startEvent={eventX.asset.eventData.startEvent}
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
    {/* TODO TIJDELIJK EIND*/}
    <TicketAccordion/>
    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});
