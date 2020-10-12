import React from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import Button from "@material-ui/core/Button";
import * as Actions from "../../store/actions";
import {useHistory} from "react-router-dom";

export const Checkout = withReducer("checkout", reducer)((props) => {
  const basket = useSelector(({blockchain}) => blockchain.basket.items);
  const dispatch = useDispatch();
  const history = useHistory();

  return <div className="mt-10">
    <div>
      <ul>
        <li>Tickets in de basket</li>
        <li>Totale kosten</li>
        <li>betalen</li>
      </ul>
      <Button
        onClick={() => {
          console.log(basket);
          history.push('/my-tickets');
          dispatch(Actions.checkoutBasket(basket));
        } }
        variant="contained"
        size="small"
        color="secondary"
        >Buy Tickets</Button>
    </div>
    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});
