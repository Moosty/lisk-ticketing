import React, {useEffect} from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/EventList";
import {AccountHeader} from "components/AccountHeader";
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";

export const Account = withReducer("account", reducer)((props) => {

  const accounts = useSelector(({blockchain}) => blockchain.account.accounts);
  const { address } = useParams();
  const thisAccount = accounts.find(account => account.address === address );

  return <div className="mt-10">
    <AccountHeader
      key={thisAccount.address}
      name={thisAccount.asset.username}
      balance={thisAccount.balance}
    />
    <div>
      <ul>
        <li>- settings (naam, email) & wijzigen
        </li>
        <li>- gekochte tickets</li>
        <li>- tickets in de verkoop</li>
        <li>-- geschieenis van je events & tickets</li>
      </ul>
    </div>
    <CartBottom totalPrice="€ 185.56"/>
  </div>;
});
