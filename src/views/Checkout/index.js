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
import {PortfolioItem} from "components/PortfolioItem";

export const Checkout = withReducer("checkout", reducer)((props) => {
  const basket = useSelector(({blockchain}) => blockchain.basket.items);

  const dispatch = useDispatch();
  const history = useHistory();

  return <div className="mt-10">

      {basket && basket.map(item => {
        console.log(basket);

        return ( <PortfolioItem
          type="sell"
          key={item.basketId}
          keyEvent={item.eventId}
          ticketType={item.ticketType}
        />)
      })}

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

      <ul>
        <li>Totale kosten</li>
        <li>betalen</li>
      </ul>


    <CartBottom
      totalPrice="€ 185.56"/>
  </div>;
});
