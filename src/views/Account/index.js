import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";

export const Account = (props) => {
  return <div>
  <AccountHeader
  title="Raphael Cornelis"/>

    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
};
