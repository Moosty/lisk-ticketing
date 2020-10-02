import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";

export const Checkout = (props) => {
  return <div className="mt-10">
    <div>
      <ul>
        <li>Tickets in de basket</li>
        <li>Totale kosten</li>
        <li>betalen</li>
      </ul>
    </div>
    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
};
