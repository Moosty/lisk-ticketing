import React from "react";
import {Header} from "components/Header";
import {TicketAccordion, CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";

export const Event = (props) => {
  return <div>
  <EventHeader
    artist="Indian Askin"
    location="Melkweg - Amsterdam"
    time="za 20.00"
    day="02"
    month="jan"/>
    <TicketType
    type="First Release Ticket"
    price="€ 45.26"
    style={{backgroundColor:"#ECEFF1"}}/>
    <TicketType
      type="Second Release Ticket"
      price="€ 55.26"
      style={{backgroundColor:"#CFD8DC"}}/>
    <TicketType
      type="Last Release Ticket"
      price="€ 75.26"
      style={{backgroundColor:"#B0BEC5"}}/>
      <TicketAccordion />
    <CartBottom
    totalPrice="€ 185.56"/>
  </div>;
};
