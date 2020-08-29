import React from "react";
import {Header} from "components/Header";
import {TicketListItem} from "components/index";
import {TicketList} from "components/TicketList";

export const Overview = (props) => {
  return <div>
    <Header
    title="An Honest Ticketing System"
    subtitle="Buy or sell your tickets"
    button1="Buy Tickets"
    button2="Sell Tickets"/>
    <TicketList/>
  </div>;
};
