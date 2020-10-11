import React from "react";
import {TicketAccordion, CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import {useSelector} from "react-redux";

export const Event = withReducer("event", reducer)((props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);

  return <div className="mt-10">



    {/* TODO: Map vervangen voor iets anders dat filtert (find?)*/}
    {events && events.map((event) => <EventHeader
      key={event.address}
      artist={event.asset.eventData.artist}
      location={event.asset.eventData.location}
      startEvent={event.asset.eventData.startEvent}
    />)}
    {/*TODO: de achtergrondkleur aanpassen in de map*/}

    {events && events.map((event) => event.asset.ticketData.types.map((type) =>
      <TicketType
        key={type.id}
        label={type.name}
        price={type.price}
        amount={type.amount}
        eventId = {event.address}
        ticketType={type.id}
      />))}


    <TicketAccordion/>

    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});
