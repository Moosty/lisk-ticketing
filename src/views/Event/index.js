import React from "react";
import {Header} from "components/Header";
import {EventHeader, TicketListItem, TicketType} from "components/index";
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
    price="€ 45.26"/>
    <TicketType
      type="Second Release Ticket"
      price="€ 55.26"/>
    <TicketType
      type="Last Release Ticket"
      price="€ 75.26"/>

  </div>;
};
