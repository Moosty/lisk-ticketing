import React from "react";
import {Header} from "components/Header";
import {TicketAccordion, CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import {useSelector} from "react-redux";

export const Event = withReducer("Event", reducer)((props) => {
  const events = useSelector(({blockchain}) => blockchain.event.events);

  return <div className="mt-10">

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
      />))}

    {/*<TicketType*/}
    {/*  type="First Release Ticket"*/}
    {/*  price=" 45.26"*/}
    {/*  style={{backgroundColor: "#ECEFF1"}}/>*/}
    {/*<TicketType*/}
    {/*  type="Second Release Ticket"*/}
    {/*  price=" 55.26"*/}
    {/*  style={{backgroundColor: "#CFD8DC"}}/>*/}
    {/*<TicketType*/}
    {/*  type="Last Release Ticket"*/}
    {/*  price=" 75.26"*/}
    {/*  style={{backgroundColor: "#B0BEC5"}}/>*/}
    <TicketAccordion/>

    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});
