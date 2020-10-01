import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";

export const Account = (props) => {
  return <div className="mt-10">
    <AccountHeader
      name="Raphael Cornelis"
      balance="145 LSK"/>

    <div>

      <ul>
        <li>- settings (naam, email) & wijzigen
        </li>
        <li>- gekochte tickets</li>
        <li>- tickets in de verkoop</li>
        <li>-- geschieenis van je events & tickets</li>
      </ul>

    </div>
    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
};
