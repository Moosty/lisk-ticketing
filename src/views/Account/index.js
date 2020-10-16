import React, {useEffect} from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";

export const Account = withReducer("account", reducer)((props) => {

  const accounts = useSelector(({blockchain}) => blockchain.account.accounts);
  const { address } = useParams();
  const accountX = accounts.find(account => account.address === address );

  useEffect(() => {
    console.log(accounts);
    console.log(accountX);
  }, [accounts]);



  return <div className="mt-10">
    <AccountHeader
      key={accountX.address}
      name={accountX.asset.username}
      balance={accountX.balance}
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
    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});
